import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../../config/cloudinary.config.js';
import pool from '../../config/database.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/-$/, '');
};
const seedHeroes = async () => {
  const jsonPath = path.join(__dirname, 'heroes-data.json');

  try {
    const rawData = await fs.readFile(jsonPath, 'utf-8');
    const heroes = JSON.parse(rawData);

    console.log(`Starting upload & insert process for ${heroes.length} items`);

    const values = [];
    let count = 1;

    for (const hero of heroes) {
      const originalName = hero.name.trim();
      const slugName = convertToSlug(hero.name);
      const fileName = `${slugName}.webp`;
      const uploadFolder = path.join(process.cwd(), 'uploads');
      const imagePath = path.join(uploadFolder, fileName);

      console.log('---');
      console.log('nomor ke-', count++);
      console.log(`👤 Pahlawan: ${originalName}`);
      console.log(`🔗 Generated Slug: ${slugName}`);
      console.log(`📂 Mencari File di: ${imagePath}`);

      const uploadResult = await cloudinary.uploader.upload(imagePath, {
        folder: 'pahlawan_indonesia',
      });

      const now = new Date().toISOString();

      values.push([
        hero.name.trim(),
        hero.ascencion_document_number,
        hero.ascencion_document_date,
        hero.ascencion_year,
        uploadResult.secure_url,
        hero.birth_date,
        hero.birth_place,
        hero.death_date,
        hero.death_place,
        hero.burial_place,
        hero.description,
        now,
        now,
      ]);
    }

    console.log(`📦 Menyusun query Bulk Insert untuk ${values.length} data...`);

    const queryText = `
                    INSERT INTO heroes 
                    (name, ascencion_document_number, ascencion_document_date, ascencion_year, photo_url, birth_date, birth_place, death_date, death_place, burial_place, description, created_at, updated_at
                    )
                    VALUES
                    ${values
                      .map(
                        (_, i) =>
                          `($${i * 13 + 1}, $${i * 13 + 2}, $${i * 13 + 3}, $${i * 13 + 4}, $${i * 13 + 5}, $${i * 13 + 6}, $${i * 13 + 7}, $${i * 13 + 8}, $${i * 13 + 9}, $${i * 13 + 10}, $${i * 13 + 11}, $${i * 13 + 12}, $${i * 13 + 13}
                          )`,
                      )
                      .join(', ')}
                    RETURNING id;
                  `;

    const result = await pool.query(queryText, values.flat());

    console.log(
      `✅ Berhasil memasukkan ${result.rowCount} pahlawan ke database.`,
    );
  } catch (error) {
    console.error('❌ Gagal seeding:', error.message);
  } finally {
    await pool.end();
  }
};

seedHeroes();

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

const seedCultures = async () => {
  const jsonPath = path.join(__dirname, 'culture.json');

  try {
    const rawData = await fs.readFile(jsonPath, 'utf-8');
    const cultures = JSON.parse(rawData);

    console.log(`Structuring Bulk Insert query for ${values.length} rows...`);

    const values = [];
    let count = 1;

    for (const culture of cultures) {
      const originalName = culture.name.trim();
      const slugName = convertToSlug(culture.name);
      const fileName = `${slugName}.webp`;
      const uploadFolder = path.join(process.cwd(), 'uploads');
      const imagePath = path.join(uploadFolder, fileName);

      console.log('---');
      console.log(`Nomor urut ke-, ${count++}`);
      console.log(`[1] cuture: ${originalName}`);
      console.log(`[2] Generated Slug: ${slugName}`);
      console.log(`[3] Searching for files in: ${imagePath}`);

      const uploadResult = await cloudinary.uploader.upload(imagePath, {
        folder: 'budaya_indonesia',
      });

      const now = new Date().toISOString();

      values.push([
        culture.name.trim(),
        uploadResult.secure_url,
        culture.description,
        now,
        now,
      ]);
    }

    console.log(`Structuring Bulk Insert query for ${values.length} rows...`);

    const queryText = `
                        INSERT INTO cultures 
                        (name, "photo_url", description, "created_at", "updated_at") 
                        VALUES 
                        ${values
                          .map(
                            (_, i) =>
                              `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`,
                          )
                          .join(', ')}
                        RETURNING id;
                    `;

    const result = await pool.query(queryText, values.flat());
    console.log(
      `${result.rowCount} cultures successfully inserted into the database.`,
    );
  } catch (error) {
    console.error('Fatal error occurred on the seeder:', error.message);
  } finally {
    await pool.end();
  }
};

seedCultures();

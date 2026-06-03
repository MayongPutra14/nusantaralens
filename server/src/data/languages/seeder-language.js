import 'dotenv/config';
import pool from '../../config/database.config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedLanguages = async () => {
  const files = [
    {
      name: 'Jawa',
      isoCode: 'jv',
      fileName: 'Jawa.json',
    },
    {
      name: 'Aceh',
      isoCode: 'ace',
      fileName: 'Aceh.json',
    },
    {
      name: 'Abui',
      isoCode: 'abui',
      fileName: 'Abui.json',
    },
  ];

  const client = await pool.connect();

  try {
    console.log('Initiating database seeding process...');
    await client.query('BEGIN');

    for (const file of files) {
      const filePath = path.join(__dirname, file.fileName);
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        continue;
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const rawData = JSON.parse(fileContent);

      const indoData = rawData['Indonesia'];
      const localData = rawData[file.name];

      if (!indoData || !localData) {
        console.warn(`Invalid JSON structure in file: ${file.fileName}`);
        continue;
      }

      const langRes = await client.query(
        `
        INSERT INTO languages (name, iso_code)
        VALUES ($1, $2)
        ON CONFLICT (iso_code) DO UPDATE SET name = EXCLUDED.name
        RETURNING id
        `,
        [file.name, file.isoCode],
      );
      const languageId = langRes.rows[0].id;

      for (const index in indoData) {
        const indoWord = indoData[index]?.trim().toLowerCase();
        const localValue = localData[index]?.trim();

        if (!indoWord || !localValue) continue;

        const wordRes = await client.query(
          `INSERT INTO words (lemma) 
           VALUES ($1) 
           ON CONFLICT (lemma) DO UPDATE SET lemma = EXCLUDED.lemma 
           RETURNING id`,
          [indoWord],
        );
        const wordId = wordRes.rows[0].id;

        const translations = localValue.split(',').map((s) => s.trim());

        for (const item of translations) {
          if (!item) continue;
          await client.query(
            `INSERT INTO translations (language_id, word_id, translation) 
             VALUES ($1, $2, $3) 
             ON CONFLICT DO NOTHING`,
            [languageId, wordId, item],
          );
        }
      }

      console.log(`Successfully processed ${file.name} (${file.isoCode})`);
    }

    await client.query('COMMIT');
    console.log('Database seeding has been completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Fatal error occurred on the seeder:', error.message);
  } finally {
    client.release();
  }
};

seedLanguages();

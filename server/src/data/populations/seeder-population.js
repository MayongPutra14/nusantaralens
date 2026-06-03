import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PENDUDUK_DIR = path.join(
  __dirname,
  '../../../../data-science/Dataset/Data Penduduk',
);

const TARGET_API_URL =
  `${process.env.DS_URL}/populations` ||
  'http://localhost:5000/admin/sync/populations';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const findJsonFiles = async (dir, fileList = []) => {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const resPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await findJsonFiles(resPath, fileList);
    } else if (
      file.name.startsWith('data_gabungan_') &&
      file.name.endsWith('.json')
    ) {
      fileList.push({
        fileName: file.name,

        filePath: resPath,
      });
    }
  }

  return fileList;
};

const runSync = async () => {
  try {
    console.log('====== START PROSCESS SCANNING DATA ======');

    const targetFiles = await findJsonFiles(DATA_PENDUDUK_DIR);
    if (!targetFiles || targetFiles.length === 0) {
      console.log(' file data_gabungan_*.json not found!');
      return;
    }

    console.log(`Find ${targetFiles.length} island files and ready to sync.`);

    for (const fileInfo of targetFiles) {
      console.log(`\n Reading: ${fileInfo.fileName}`);
      const rawData = await fs.readFile(fileInfo.filePath, 'utf-8');
      const jsonData = JSON.parse(rawData);
      const islandSlug = fileInfo.fileName
        .replace('data_gabungan_', '')
        .replace('.json', '');
      const regionName = islandSlug
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const response = await fetch(TARGET_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ADMIN_API_KEY,
        },
        body: JSON.stringify({
          region: regionName,
          slug: islandSlug.replace(/_/g, '-'),
          data: jsonData,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log(
          `Island synced successfully ${regionName}. Total: ${responseData.data.total_data} rows.`,
        );
      } else {
        console.error(
          ` Failed Synchronize island ${regionName}:`,
          responseData.message,
        );
      }
    }

    console.log('\n====== ALL SYNCHRONIZATIONS IS DONE ======');
  } catch (error) {
    console.error('Fatal error occurred on the seeder:', error.message);
  }
};

runSync();

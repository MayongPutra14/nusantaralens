import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LAND_AREA_FILE = path.join(
  __dirname,
  '../../../../data-science/Dataset/Luasan_Wilayah/luas_wilayah_per_pulau.json',
);

const TARGET_API_URL =
  `${process.env.DS_URL}/land-areas` ||
  'http://localhost:5000/admin/sync/land-areas';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const groupByIsland = (data) => {
  const grouped = {};

  for (const item of data) {
    const islandName = item.Pulau?.trim();
    if (!islandName) continue;

    const slug = generateSlug(islandName);
    if (!grouped[slug]) {
      grouped[slug] = [];
    }

    grouped[slug].push(item);
  }
  return grouped;
};

const runSync = async () => {
  try {
    console.log('====== START PROCESS LAND AREAS SYNCHRONIZATION ======');

    const rawData = await fs.readFile(LAND_AREA_FILE, 'utf-8');
    const jsonData = JSON.parse(rawData);

    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.log('Land area data is empty!');
      return;
    }

    const groupedData = groupByIsland(jsonData);
    const islands = Object.entries(groupedData);

    console.log(`Found ${islands.length} islands ready to sync.`);

    for (const [slug, islandData] of islands) {
      console.log(`\nSyncing island: ${slug}`);

      const response = await fetch(TARGET_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ADMIN_API_KEY,
        },
        body: JSON.stringify({
          slug,
          data: islandData,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log(
          `Successfully synced ${slug}. Total: ${responseData.data.total_synced} rows.`,
        );
      } else {
        console.error(`Failed syncing ${slug}:`, responseData.message);
      }
    }
    console.log('\n====== ALL ECONOMIC GROWTH SYNCHRONIZATION DONE ======');
  } catch (error) {
    console.error('Fatal error occurred on the seeder:', error.message);
  }
};

runSync();

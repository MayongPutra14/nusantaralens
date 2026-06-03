import { findIslandBySlug } from '../repositories/island.repository.js';
import { upsertLandAreas } from '../repositories/lands.repository.js';

export const syncLandAreasData = async (slug, data) => {
  const island = await findIslandBySlug(slug);

  if (!island) {
    const error = new Error('Island not found');
    error.status = 404;
    throw error;
  }

  let totalSynced = 0;

  for (const item of data) {
    const rawKm =
      item['Luas Wilayah (Km2)']?.toString().replace(',', '.') || '0';
    const rawPct =
      item['Persentase Luas Wilayah']?.toString().replace(',', '.') || '0';
    await upsertLandAreas({
      islandId: island.id,
      year: Number(item.tahun),
      land_area_km: parseFloat(rawKm),
      land_area_percentage: parseFloat(rawPct),
    });
    totalSynced++;
  }

  return {
    island: island.name,
    total_synced: totalSynced,
  };
};

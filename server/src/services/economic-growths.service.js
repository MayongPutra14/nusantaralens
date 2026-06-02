import { findIslandBySlug } from '../repositories/island.repository.js';
import { upsertEconomicGrowth } from '../repositories/economic-growths.repository.js';

export const syncEconomicGrowthData = async (slug, data) => {
  const island = await findIslandBySlug(slug);

  if (!island) {
    const error = new Error('Island not found');
    error.status = 404;
    throw error;
  }

  let totalSynced = 0;

  for (const item of data) {
    await upsertEconomicGrowth({
      islandId: island.id,
      year: Number(item.tahun),
      growthrate: Number(item.Laju_Pertumbuhan_Ekonomi.replace(',', '.')),
    });
    totalSynced++;
  }

  return {
    island: island.name,
    total_synced: totalSynced,
  };
};

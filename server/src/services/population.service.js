import { findIslandBySlug } from '../repositories/island.repository.js';
import {
  upsertPopulation,
  findPopulationByIslandId,
} from '../repositories/population.repository.js';

export const syncPopulationData = async (region, slug, data) => {
  let totalSynced = 0;
  let startYear = null;
  let endYear = null;

  const island = await findIslandBySlug(slug);
  if (!island) {
    const error = new Error(`Island with slug "${slug}" not found`);
    error.status = 404;
    throw error;
  }

  for (const item of data) {
    const currentYear = Number(item.tahun);
    const malePopulation = Number(item.laki_laki);
    const femalePopulation = Number(item.perempuan);

    const totalPopulation = Number(
      item.total_keseluruhan || malePopulation + femalePopulation,
    );

    await upsertPopulation({
      islandId: island.id,
      year: currentYear,
      malePopulation,
      femalePopulation,
      totalPopulation,
    });

    if (startYear === null || currentYear < startYear) startYear = currentYear;
    if (endYear === null || currentYear > endYear) endYear = currentYear;

    totalSynced++;
  }

  return {
    message: `Population data for ${region} synced successfully`,
    totalSynced,
    data: {
      city: region,
      start_year: startYear,
      end_year: endYear,
    },
  };
};

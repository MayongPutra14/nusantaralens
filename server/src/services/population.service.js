import {
  upsertPopulation,
  findIslandById,
} from '../repositories/population.repository.js';
import redisClient from '../config/redis.config.js';

export const syncPopulationData = async (region, slug, data) => {
  let totalSynced = 0;
  let startYear = null;
  let endYear = null;

  for (const item of data) {
    const currentYear = Number(item.tahun);
    const malePopulation = Number(item.laki_laki);
    const femalePopulation = Number(item.perempuan);

    const totalPopulation = Number(
      item.total_keseluruhan || malePopulation + femalePopulation,
    );

    await upsertPopulation({
      slug,
      year: currentYear,
      region,
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

export const fetchIslandById = async (islandId) => {
  const CACHE_KEY = `indonesian:island:${islandId}`;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) return JSON.parse(cachedData);

  const island = await findIslandById(islandId);
  if (!island || island.length === 0) {
    const error = new Error('Island not found');
    error.status = 404;
    throw error;
  }

  await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(island));
  return island;
};

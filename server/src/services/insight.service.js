import redisClient from '../config/redis.config.js';
import { findIslandBySlug } from '../repositories/island.repository.js';
import { findPopulationByIslandId } from '../repositories/population.repository.js';
import { findEconomicGrowthsByIslandId } from '../repositories/economic-growths.repository.js';
import { findLandAreasByIslandId } from '../repositories/lands.repository.js';

export const fetchIslandBySlug = async (islandSlug) => {
  const CACHE_KEY = `indonesian:island:${islandSlug}`;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) return JSON.parse(cachedData);

  const island = await findIslandBySlug(islandSlug);
  if (!island || island.length === 0) {
    const error = new Error('Island not found');
    error.status = 404;
    throw error;
  }

  const [populations, economic_growths, land_areas] = await Promise.all([
    findPopulationByIslandId(island.id),
    findEconomicGrowthsByIslandId(island.id),
    findLandAreasByIslandId(island.id),
  ]);

  const result = {
    island,
    populations,
    economic_growths,
    land_areas,
  };

  await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(result));
  return result;
};

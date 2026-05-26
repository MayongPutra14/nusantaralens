import { findAllCultures } from '../repositories/culture.repository.js';
import redisClient from '../config/redis.config.js';

export const fecthCultures = async () => {
  const CACHE_KEY = 'cultures:all';

  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) return JSON.parse(cachedData);

  const cultures = await findAllCultures();
  if (!cultures || cultures.length === 0) {
    const error = new Error('Cultures not found');
    error.status = 404;
    throw error;
  }

  await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(cultures));
  return cultures;
};

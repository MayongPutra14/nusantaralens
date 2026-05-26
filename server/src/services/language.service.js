import redisClient from '../config/redis.config.js';
import { findLanguageByIsoCode } from '../repositories/language.repository.js';

export const fetchLanguageByIsoCode = async (isoCode) => {
  const CACHE_KEY = `lang:${isoCode}`;

  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    console.log('Cache Hit!');
    return JSON.parse(cachedData);
  }

  const result = await findLanguageByIsoCode(isoCode);
  if (!result || result.length === 0) {
    const error = new Error('Language not found');
    error.status = 404;
    throw error;
  }
  await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(result));
  console.log('Cache Miss!');

  return result;
};

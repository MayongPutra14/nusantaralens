import { findAllHeroes } from '../repositories/hero.repository.js';
import cloudinary from '../config/cloudinary.config.js';
import redisClient from '../config/redis.config.js';

export const fetchHeroes = async () => {
  const CACHE_KEY = 'heroes:all';

  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    console.log('Cache Hit!');
    return JSON.parse(cachedData);
  }

  const heroes = await findAllHeroes();
  if (!heroes || heroes.length === 0) {
    const error = new Error('Heroes not found');
    error.status = 404;
    throw error;
  }

  await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(heroes));
  console.log('Cache Miss!');

  return heroes;
};

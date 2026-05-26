import { fetchHeroes } from '../services/hero.service.js';

export const getAllHeroes = async (req, res, next) => {
  try {
    const heroes = await fetchHeroes();

    res.status(200).json({
      status: 'success',
      message: 'Heroes data retrieved successfully',
      data: {
        heroes: heroes,
      },
    });
  } catch (error) {
    next(error);
  }
};

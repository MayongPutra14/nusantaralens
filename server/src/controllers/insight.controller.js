import { fetchIslandBySlug } from '../services/insight.service.js';

export const getDataIslandBySlug = async (req, res, next) => {
  try {
    const islandSlug = req.params.islandSlug;

    const result = await fetchIslandBySlug(islandSlug);

    res.status(200).json({
      status: 'success',
      message: 'Retrieved data island succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

import {
  syncPopulationData,
  fetchIslandById,
} from '../services/population.service.js';

export const syncPopulation = async (req, res, next) => {
  try {
    const { region, slug, data } = req.body;

    if (!region || !slug || !data || !Array.isArray(data)) {
      return res.status(400).json({
        status: 'failed',
        message:
          'Invalid request body. Region, slug, and data array are required.',
      });
    }

    const result = await syncPopulationData(region, slug, data);

    res.status(200).json({
      status: 'success',
      message: result.message,
      data: {
        total_data: result.totalSynced,
        region: result.data,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDataIslandById = async (req, res, next) => {
  try {
    const islandId = req.params.islandId;

    const result = await fetchIslandById(islandId);

    res.status(200).json({
      status: 'success',
      message: 'Retrieved data island succesfully',
      data: {
        island: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

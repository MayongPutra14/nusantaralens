import { syncPopulationData } from '../services/population.service.js';

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

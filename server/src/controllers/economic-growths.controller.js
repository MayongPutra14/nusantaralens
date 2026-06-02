import { syncEconomicGrowthData } from '../services/economic-growths.service.js';

export const syncEconomicGrowth = async (req, res, next) => {
  try {
    const { slug, data } = req.body;
    if (!slug || !Array.isArray(data)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Slug and data are required',
      });
    }

    const result = await syncEconomicGrowthData(slug, data);

    res.status(200).json({
      status: 'success',
      message: 'Economic growth synced successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

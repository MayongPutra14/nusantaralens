import { syncLandAreasData } from '../services/lands.service.js';

export const syncLandAreas = async (req, res, next) => {
  try {
    const { slug, data } = req.body;
    if (!slug || !Array.isArray(data)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Slug and data are required',
      });
    }

    const result = await syncLandAreasData(slug, data);

    res.status(200).json({
      status: 'success',
      message: 'Land areas synced successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

import express from 'express';
import { syncEconomicGrowth } from '../controllers/economic-growths.controller.js';
import { apiKeyValidator } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/admin/sync/economic-growths',
  apiKeyValidator,
  syncEconomicGrowth,
);

export default router;

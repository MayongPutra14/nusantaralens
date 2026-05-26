import express from 'express';
import {
  getDataIslandById,
  syncPopulation,
} from '../controllers/population.controller.js';
import { apiKeyValidator } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/admin/sync/populations', apiKeyValidator, syncPopulation);

router.get('/islands/:islandId', getDataIslandById);

export default router;

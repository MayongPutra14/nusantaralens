import express from 'express';
import { getDataIslandBySlug } from '../controllers/insight.controller.js';
import { apiKeyValidator } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/islands/:islandSlug', getDataIslandBySlug);

export default router;

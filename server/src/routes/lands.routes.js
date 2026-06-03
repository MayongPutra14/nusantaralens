import express from 'express';
import { syncLandAreas } from '../controllers/lands.controller.js';
import { apiKeyValidator } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/admin/sync/land-areas', apiKeyValidator, syncLandAreas);

export default router;

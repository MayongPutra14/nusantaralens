import express from 'express';
import { getAllCultures } from '../controllers/culture.controller.js';

const router = express.Router();

router.get('/cultures', getAllCultures);

export default router;

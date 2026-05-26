import express from 'express';
import { getAllHeroes } from '../controllers/hero.controller.js';

const router = express.Router();

router.get('/heroes', getAllHeroes);

export default router;

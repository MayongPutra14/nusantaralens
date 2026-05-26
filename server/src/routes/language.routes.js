import express from 'express';
import { getLanguageByIsoCode } from '../controllers/language.controller.js';

const router = express.Router();

router.get('/language/:isoCode/words', getLanguageByIsoCode);

export default router;

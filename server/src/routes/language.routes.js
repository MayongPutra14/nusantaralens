import express from 'express';
import {
  getLanguageByIsoCode,
  getAllIsoCode,
} from '../controllers/language.controller.js';

const router = express.Router();

router.get('/language/:isoCode/words', getLanguageByIsoCode);

router.get('/iso-code', getAllIsoCode);

export default router;

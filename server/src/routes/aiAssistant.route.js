import express from 'express';
import { chatAiAssistant } from '../controllers/aiAssistant.cotroller.js';
import { uploadImage } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/chat', uploadImage.single('image'), chatAiAssistant);

export default router;

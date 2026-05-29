import express from 'express';
import { chatAiAssistant } from '../controllers/aiAssistant.controller.js';
import { uploadImage } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/chat/messages', uploadImage.single('image'), chatAiAssistant);

export default router;

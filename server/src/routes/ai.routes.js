import express from 'express';
import multer from 'multer';
import { predict } from '../controllers/ai.controller.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new Error('Only .png, .jpg, .jpeg and .webp are allowed!'),
      );

      callback(null, true);
    }
  },
});

router.post('/chat/messages', upload.single('image'), predict);

export default router;

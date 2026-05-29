import multer from 'multer';
import { AppError } from '../utils/appError.utils.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, calback) => {
  const allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    calback(null, true);
  } else {
    calback(
      new AppError(
        `Unsupported image format. Use PNG, JPG, JPEG, or WEBP instead `,
        400,
      ),
      false,
    );
  }
};

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
});

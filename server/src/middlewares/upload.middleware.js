import multer from 'multer';

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
    calback(new Error('Format image tidak didukung'), false);
  }
};

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
});

import cloudinary from '../config/cloudinary.config.js';
import { Readable } from 'node:stream';
import sharp from 'sharp';

export const uploadedImageToClaudinary = async (
  fileBuffer,
  folder = 'ai-chats',
) => {
  try {
    const compressedBuffer = await sharp(fileBuffer)
      .resize({
        width: 1024,
        height: 1024,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
      })
      .toBuffer();

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      Readable.from(compressedBuffer).pipe(stream);
    });

    return result;
  } catch (error) {
    throw new AppError(
      `Failed to upload image to Cloudinary: ${error.message}`,
      502,
    );
  }
};

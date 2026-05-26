import cloudinary from '../config/cloudinary.config.js';
import { Readable } from 'node:stream';

export const uploadedImageToClaudinary = async (
  fileBuffer,
  folder = 'nusantaralens',
) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      Readable.from(fileBuffer).pipe(stream);
    });

    return result;
  } catch (error) {
    throw new Error(`Cloudinary Upload Failed: ${error.message}`);
  }
};

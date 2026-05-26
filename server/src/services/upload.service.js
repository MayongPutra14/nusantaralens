// import cloudinary from '../config/cloudinary.config.js';
// import Readable from 'node:stream';

// export const uploadImageToCloudinary = async (file) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: 'ai-chats',
//       },
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }

//         resolve(result);
//       },
//     );

//     Readable.from(file.buffer).pipe(stream);
//   });
// };

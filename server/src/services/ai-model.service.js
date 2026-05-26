// import axios from 'axios';
// import FormData from 'form-data';

// export const predictImage = async (file) => {
//   if (!file) {
//     const error = new Error('Image file is required');
//     error.status = 400;
//     throw error;
//   }

//   try {
//     const formData = new FormData();

//     formData.append('image', file.buffer, {
//       filename: file.originalname,
//       contentType: file.mimetype,
//     });

//     const response = await axios.post(process.env.AI_MODEL_URL, formData, {
//       headers: formData.getHeaders(),
//       timeout: 30000,
//     });

//     return response.data;
//   } catch (err) {
//     const error = new Error('AI Model failed to predict image', { cause: err });
//     error.status = 502;
//     throw error;
//   }
// };

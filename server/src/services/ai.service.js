import { geminiAI } from '../config/gemini.config.js';
import { saveChatHistory } from '../repositories/ai.repository.js';
import cloudinary from '../config/cloudinary.config.js';
import Readable from 'node:stream';
import axios from 'axios';
import FormData from 'form-data';

export const generateExplanation = async ({
  sessionId,
  label,
  prompt,
  photoUrl = null,
}) => {
  try {
    const result = await geminiAI.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: `
      User question:
      ${prompt}

      Detected object:
      ${label} 
      Berikan penjelasan yang relevan,
      singkat, menarik, dan edukatif.
      `,
      config: {
        systemInstruction:
          'Anda adalah asisten ahli NusantaraLens yang pakar dalam budaya Indonesia.',
        temperature: 0.7,
      },
    });

    const aiResponseText = result.text;
    await saveChatHistory(sessionId, label, aiResponseText, photoUrl);

    return {
      prediction: label,
      aiResponse: aiResponseText,
      photoUrl,
    };
  } catch (err) {
    const error = new Error('AI Provider failed to respond', { cause: err });
    error.status = 502;
    throw error;
  }
};

export const predictImage = async (file) => {
  return {
    label: 'Rafflesia Arnoldii',
    confidence: 0.97,
    // if (!file) {
    //   const error = new Error('Image file is required');
    //   error.status = 400;
    //   throw error;
    // }

    // try {
    //   const formData = new FormData();

    //   formData.append('image', file.buffer, {
    //     filename: file.originalname,
    //     contentType: file.mimetype,
    //   });

    //   const response = await axios.post(process.env.AI_MODEL_URL, formData, {
    //     headers: formData.getHeaders(),
    //     timeout: 30000,
    //   });

    //   return response.data;
    // } catch (err) {
    //   const error = new Error('AI Model failed to predict image', { cause: err });
    //   error.status = 502;
    //   throw error;
  };
};

export const uploadImageToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'ai-chats',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    Readable.from(file.buffer).pipe(stream);
  });
};

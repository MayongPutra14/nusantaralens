import axios from 'axios';
import FormData from 'form-data';
import { AppError } from '../utils/appError.utils.js';
import { GoogleGenAI } from '@google/genai';

const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const predictImage = async (image) => {
  try {
    const formData = new FormData();

    formData.append('file', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    const response = await axios.post(process.env.AI_MODEL_URL, formData, {
      headers: formData.getHeaders(),
      timeout: 30000,
    });
    if (
      response.data &&
      response.data.status === 'success' &&
      response.data.data.length > 0
    ) {
      return response.data.data[0];
    }
  } catch (err) {
    const statusCode = err.response ? err.response.status : 502;
    const message =
      err.response?.data?.message || 'External Model AI is not response.';
    throw new AppError(`Predict Image Failed: ${message}`, statusCode);
  }
};

export const generateGeminiResponse = async (prompt, history = []) => {
  try {
    const contents = [];

    history.forEach((chat) => {
      if (chat.user_query) {
        contents.push({
          role: 'user',
          parts: [
            {
              text: chat.user_query,
            },
          ],
        });
      } else {
        contents.push({
          role: 'user',
          parts: [
            {
              text: '[User mengirim foto budaya]',
            },
          ],
        });
      }
      contents.push({
        role: 'model',
        parts: [
          {
            text: chat.ai_response,
          },
        ],
      });
    });

    contents.push({
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    });
    const response = await geminiAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    return response.text;
  } catch (err) {
    if (err.status === 429 || err.message?.includes('429')) {
      throw new AppError(
        'AI usage limit reached. Please try again shortly.',
        429,
      );
    }
    const statusCode = err.status || 502;
    throw new AppError(
      'Gemini AI failed to respond. Please contact the administrator if this issue',
      statusCode,
    );
  }
};

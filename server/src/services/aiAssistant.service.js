import { geminiAI } from '../config/gemini.config.js';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import FormData from 'form-data';
import { AppError } from '../utils/appError.utils.js';
import { uploadedImageToClaudinary } from './claudinary.service.js';
import { NUSABOT_SYSTEM_PROMPT } from '../utils/prompt/nusabot.system.prompt.js';
import {
  getChatHistoryBySession,
  saveChatHistory,
} from '../repositories/aiAsisstant.repository.js';

export const predictImage = async (image) => {
  try {
    const formData = new FormData();

    formData.append('file', image.buffer, {
      filename: image.originalname || 'image.jpg',
      contentType: image.mimetype || 'image/jpeg',
      knownLength: image.buffer.length,
    });

    const response = await axios.post(process.env.AI_MODEL_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
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
    console.error('AXIOS ERROR DETAILS:', err.response?.data || err.message);
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
      config: {
        systemInstruction: NUSABOT_SYSTEM_PROMPT,
        temperature: process.env.GEMINI_TEMPRATURE,
        maxOutputTokens: process.env.GEMINI_MAX_TOKEN,
      },
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

export const handleChatAssistant = async ({ sessionId, prompt, image }) => {
  let photoUrl = null;
  let finalResponse = '';

  const history = await getChatHistoryBySession(sessionId);

  if (image) {
    const cloudinaryResult = await uploadedImageToClaudinary(image.buffer);
    photoUrl = cloudinaryResult.secure_url;

    const prediction = await predictImage(image);
    const geminiPrompt = `
        User Prompt:
        ${prompt || 'tidak ada prompt dari user!'}
        Hasil Analisis AI:
        - Prediksi budaya: ${prediction.prediction}
      `;

    finalResponse = await generateGeminiResponse(geminiPrompt, history);
  } else if (prompt) {
    finalResponse = await generateGeminiResponse(prompt, history);
  }

  await saveChatHistory({
    sessionId,
    userQuery: prompt || '-',
    aiResponse: finalResponse,
    photoUrl,
  });

  return {
    sessionId,
    prompt,
    photoUrl,
    response: finalResponse,
  };
};

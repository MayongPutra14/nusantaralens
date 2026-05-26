import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('FATAL ERROR: GEMINI_API_KEY is not defined in .env file.');
}

export const geminiAI = new GoogleGenAI({ apiKey: API_KEY });

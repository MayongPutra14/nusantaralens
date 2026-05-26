import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in .env file');
}

const geminiAI = new GoogleGenAI({
  apiKey: API_KEY,
});

const testGemini = async () => {
  try {
    console.log('Sending request to Gemini...\n');

    const result = await geminiAI.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',

      contents: `
      Jelaskan secara singkat siapa itu tan malaka.
      `,

      config: {
        systemInstruction: 'Anda adalah asisten ahli budaya Indonesia.',

        temperature: 0.7,
      },
    });

    console.log('Gemini Response:\n');

    console.log(result.text);
  } catch (err) {
    console.error('\nGemini Error:\n');

    console.error(err);
  }
};

testGemini();

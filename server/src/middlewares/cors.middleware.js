import cors from 'cors';
import { AppError } from '../utils/appError.utils.js';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigin = [process.env.FRONTEND_URL, 'http://localhost:5173'];

    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new AppError('Access denied by NusantaraLens CORS policy.', 403),
      );
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: [`Content-Type`, 'Authorization', 'x-api-key'],
  credential: true,
};

export const corsMiddleware = cors(corsOptions);

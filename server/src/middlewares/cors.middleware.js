import cors from 'cors';
import { AppError } from '../utils/appError.utils.js';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigin = process.env.FRONTEND_URL;

    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(
        new AppError('Access denied by NusantaraLens CORS policy.', 403),
      );
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: [`Content-Type`, 'Authorization'],
  credential: true,
};

export const corsMiddleware = cors(corsOptions);

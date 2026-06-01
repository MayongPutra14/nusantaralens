import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { swaggerUI, openapiDocument } from './utils/swaggerUI.js';
import errorHandler from './middlewares/errorHandler.middlerware.js';
import heroRoutes from './routes/hero.routes.js';
import cultureRoutes from './routes/culture.routes.js';
import languageRoutes from './routes/language.routes.js';
import populationRoutes from './routes/population.routes.js';
import aiAssistantRoutes from './routes/aiAssistant.routes.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

app.use(corsMiddleware);
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiDocument));
app.use(heroRoutes);
app.use(cultureRoutes);
app.use(languageRoutes);
app.use(populationRoutes);
app.use(aiAssistantRoutes);

app.get('/', (req, res) => {
  res.send(`Assalamualaikum API berhasil berjalan`);
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server Is Running on http://${HOST}:${PORT}`);
  });
}

export default app;

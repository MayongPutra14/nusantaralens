import path from 'path';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OPEN_API_PATH = path.join(__dirname, '../../openapi.json');

const openapiDocument = JSON.parse(fs.readFileSync(OPEN_API_PATH, 'utf8'));

export { swaggerUI, openapiDocument };

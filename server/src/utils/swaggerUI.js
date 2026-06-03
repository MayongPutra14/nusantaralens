import swaggerUI from 'swagger-ui-express';
import openapiDocument from '../../openapi.json' with { type: 'json' };

const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
  ],
};
const swaggerSetup = swaggerUI.setup(openapiDocument, swaggerOptions);

export { swaggerUI, openapiDocument, swaggerSetup };

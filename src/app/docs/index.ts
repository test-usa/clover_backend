import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swap',
      version: '1.0.0',
      description: 'Auto-generated API docs with Swagger and TypeScript',
    },
    servers: [
      {
        url: 'https://clover-backend-lyh6.onrender.com/api/v1',
      },
    ],
  },
  apis: ['src/app/modules/**/*.ts'], // scan these files for Swagger comments
};

export const swaggerSpec = swaggerJSDoc(options);

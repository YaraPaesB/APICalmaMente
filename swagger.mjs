// swagger.ts

import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json'; // Arquivo onde a especificação OpenAPI será salva
const endpointsFiles = ['./src/routes/*.ts']; // Caminho para os arquivos que contêm as rotas da sua API

const doc = {
  info: {
    title: 'CalmaMente API',
    description: 'Documentação da API gerada automaticamente',
    version: '1.0.0',
  },
  host: 'localhost:8080', // Host da sua API
  basePath: '/api', // Prefixo base das rotas da sua API
  schemes: ['http'], // Protocolo utilizado (http, https)
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger specification generated successfully!');
});

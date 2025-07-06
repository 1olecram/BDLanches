import express from 'express';
import router from './routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const appApi = express();
appApi.use(cors({
    origin: 'http://localhost:3000', // Ou true para permitir qualquer origem
    credentials: true // Se estiver usando cookies
})); // Middleware para permitir requisições de diferentes origens.
appApi.use(express.json()); // Middleware para interpretar requisições com corpo no formato JSON.
appApi.use(bodyParser.json());
appApi.use(cookieParser());
appApi.use(router); // Adiciona as rotas da aplicação.

export default appApi;
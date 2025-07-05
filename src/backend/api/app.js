import express from 'express';
import router from './routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors()); // Middleware para permitir requisições de diferentes origens.
app.use(express.json()); // Middleware para interpretar requisições com corpo no formato JSON.
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router); // Adiciona as rotas da aplicação.
app.use(express.static('src'));

export default app;
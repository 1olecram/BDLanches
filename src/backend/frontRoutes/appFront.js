import express from 'express';
import router from './routesFront.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const frontApp = express();
frontApp.use(cookieParser());
frontApp.use(cors({
    origin: 'http://localhost:4000', // Ou true para permitir qualquer origem
    credentials: true // Se estiver usando cookies
}));
frontApp.use(express.json()); // Middleware para interpretar requisições com corpo no formato JSON.
frontApp.use(router); // Rotas manuais (para autenticação ou rotas específicas)
frontApp.use(express.static('src/frontend')); // Serve TUDO (incluindo HTML)


export default frontApp;
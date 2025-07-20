import appApi from "./src/backend/api/appApi.js";
import frontApp from "./src/backend/frontRoutes/appFront.js";
import dotenv from 'dotenv';
dotenv.config();
/**
 * Rodar o servidor!
 */

appApi.listen(process.env.API_PORT, '0.0.0.0', function(){
    console.log(`BACKEND rodando na porta ${process.env.API_PORT}!`);
});

frontApp.listen(process.env.FRONT_PORT, '0.0.0.0', function(){
    console.log(`SITE rodando na porta ${process.env.FRONT_PORT}!`);
});
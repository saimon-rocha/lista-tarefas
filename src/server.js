const express = require('express');
const routes = require('./routes'); // Importa as rotas definidas

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Usando as rotas
app.use('/', routes); // Define o prefixo para as rotas

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

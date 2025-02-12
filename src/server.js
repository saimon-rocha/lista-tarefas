const express = require('express');
const routes = require('./routes'); // Importa as rotas definidas
const { engine } = require('express-handlebars');  
const path = require('path');

const app = express();

// Middleware para processar JSON
app.use(express.json());

// 🔥 Adicione este middleware para processar dados do formulário (importante para req.body funcionar!)
app.use(express.urlencoded({ extended: true }));

// Usando as rotas
app.use('/', routes);

// Configuração do template engine Handlebars com helper de JSON
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    helpers: { json: (context) => JSON.stringify(context) },
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

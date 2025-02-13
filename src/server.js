const express = require('express');
const routes = require('./routes');
const { engine } = require('express-handlebars'); 
const path = require('path');

const app = express();

// Configuração do template engine Handlebars com helpers
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    helpers: {
        json: (context) => JSON.stringify(context),
        ifEquals: function (arg1, arg2, options) {
            return arg1 === arg2 ? options.fn(this) : options.inverse(this);
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usando as rotas
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const express = require('express');
const routes = require('./routes');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');  // Importando o express-session

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

// Configuração da sessão (deve vir antes do flash)
app.use(session({
    secret: '123444',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Defina como `true` se usar HTTPS
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});


// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

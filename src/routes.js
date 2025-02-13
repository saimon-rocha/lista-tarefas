const { Router } = require('express');
const TarefasController = require('./apps/controllers/TarefasController.js')

const tarefasRoutes = new Router();

tarefasRoutes.get('/',               TarefasController.list);
tarefasRoutes.get('/cadastrar',      TarefasController.cadastrar);
tarefasRoutes.post('/salvar',        TarefasController.salvar);
tarefasRoutes.post('/concluir/:id',  TarefasController.concluir);
// tarefasRoutes.get('/editar/:id',  TarefasController.editar);
// tarefasRoutes.post('/editar/:id', TarefasController.salvarEditar);
tarefasRoutes.post('/deletar/:id',   TarefasController.deletar);
tarefasRoutes.get('/concluidas',     TarefasController.listConcluidas);


module.exports = tarefasRoutes; // Exportando o Router
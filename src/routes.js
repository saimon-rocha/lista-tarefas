const { Router } = require('express');
const TarefasController = require('./apps/controllers/TarefasController.js')

const tarefasRoutes = new Router();

tarefasRoutes.get('/',            TarefasController.list);
tarefasRoutes.get('/cadastrar',   TarefasController.cadastrar);
tarefasRoutes.post('/salvar',     TarefasController.salvar);
tarefasRoutes.post('/concluir/:id',   TarefasController.concluir);
// tarefasRoutes.get('/editar/:id',      TarefasController.editar);
// tarefasRoutes.post('/editar/:id',     TarefasController.salvarEditar);
// tarefasRoutes.delete('/deletar/:id',  TarefasController.deletar);
// tarefasRoutes.put('/desabilitar/:id', TarefasController.desabilitar);

module.exports = tarefasRoutes; // Exportando o Router
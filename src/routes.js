const express = require('express');
const routes = express.Router();

let tarefas = [];
let currentId = 1;

// Listar Tarefas
routes.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Criar Tarefa
routes.post('/criar', (req, res) => {
    const { titulo, descricao, status } = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    const novaTarefa = {
        id: currentId++,
        titulo,
        descricao,
        status: status || 'pendente',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

module.exports = routes;

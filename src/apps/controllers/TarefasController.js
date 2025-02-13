const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'tarefas.json');

class TarefasController {
    constructor() {
        this.list = this.list.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.concluir = this.concluir.bind(this);
    }

    async list(req, res) {
        const tarefas = this.lerTarefas();
        const tarefasConcluidas = tarefas.filter(tarefa => tarefa.situacao === 'concluida'); // Filtra apenas as concluídas
        res.render('home/index', { tarefas: tarefasConcluidas });
    }
    

    async cadastrar(req, res) {
        res.render('home/formulario');
    }

    async salvar(req, res) {
        const { titulo, descricao } = req.body;
        const situacao = 'pendente';
        const novasTarefas = this.lerTarefas();

        // Verifica se os campos estão vazios
        if (!titulo || !descricao) {
            return res.status(400).render('home/formulario', {
                erro: "Todos os campos são obrigatórios!",
                titulo,
                descricao
            });
        }

        // Calcula o próximo ID
        const novoId = novasTarefas.length > 0 ? novasTarefas[novasTarefas.length - 1].id + 1 : 1;

        novasTarefas.push({ id: novoId, titulo, descricao, situacao });
        this.salvarTarefas(novasTarefas);
        res.redirect('/');
    }

    async concluir(req, res) {
        const { id } = req.params;
        const tarefas = this.lerTarefas();
        const tarefa = tarefas.find(tarefa => tarefa.id === Number(id));

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada!');
        }

        tarefa.situacao = 'concluida';
        this.salvarTarefas(tarefas);
        res.redirect('/');
    }

    lerTarefas() {
        try {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    salvarTarefas(tarefas) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(tarefas, null, 2), 'utf-8');
    }
}

module.exports = new TarefasController();

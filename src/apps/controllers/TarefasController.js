const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'tarefas.json');

class TarefasController {
    constructor() {
        this.list = this.list.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    async list(req, res) {
        const tarefas = this.lerTarefas();
        res.render('home/index', { tarefas });
    }

    async cadastrar(req, res) {
        res.render('home/formulario');
    }

    async salvar(req, res) {
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const novasTarefas = this.lerTarefas();
        
        // Verifica se os campos estão vazios
        if (!titulo || !descricao) {
            return res.status(400).render('home/formulario', {
                erro: "Todos os campos são obrigatórios!",
                titulo,
                descricao
            });
        }

        novasTarefas.push({ titulo, descricao });
        this.salvarTarefas(novasTarefas);
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

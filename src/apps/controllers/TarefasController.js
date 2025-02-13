const fs = require('fs');
const path = require('path');
const moment = require('moment');


const FILE_PATH = path.join(__dirname, 'tarefas.json');

class TarefasController {
    constructor() {
        this.list = this.list.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.concluir = this.concluir.bind(this);
        this.deletar = this.deletar.bind(this);
        this.listConcluidas = this.listConcluidas.bind(this);
    }

    async list(req, res) {
        const tarefas = this.lerTarefas();
        const tarefasConcluidas = tarefas.filter(tarefa => tarefa.situacao === 'pendente'); // Filtra apenas as pendentes
        res.render('home/index', { tarefas: tarefasConcluidas });
    }


    async cadastrar(req, res) {
        res.render('home/formulario');
    }

    async salvar(req, res) {
        const { titulo, descricao, prazo} = req.body;
        const situacao = 'pendente';
        const novasTarefas = this.lerTarefas();

        // Verifica se os campos estão vazios
        if (!titulo || !descricao) {
            return res.status(400).render('home/formulario', {
                erro: "Todos os campos são obrigatórios!",
                titulo,
                descricao,
                prazo
            });
        }

        // Calcula o próximo ID
        const novoId = novasTarefas.length > 0 ? novasTarefas[novasTarefas.length - 1].id + 1 : 1;

        novasTarefas.push({ id: novoId, titulo, descricao, situacao, prazo: moment(prazo).format('DD/MM/YYYY') });
        this.salvarTarefas(novasTarefas);
        req.flash('successMessage', 'Cadastrado uma nova tarefa!');
        res.redirect('/');
    }

    async concluir(req, res) {
        const { id } = req.params;
        const dt_conclusao = moment().format('DD/MM/YYYY');
        const tarefas = this.lerTarefas();
        const tarefa = tarefas.find(tarefa => tarefa.id === Number(id));
    
        if (!tarefa) {
            req.flash('errorMessage', 'Tarefa não encontrada!');
            return res.redirect('/'); 
        }
    
        tarefa.situacao = 'concluida';
        tarefa.dt_conclusao = dt_conclusao;
        this.salvarTarefas(tarefas);
        
        req.flash('successMessage', 'Tarefa Concluída com sucesso!');
        return res.redirect('/');
    }
    
    async deletar(req, res) {
        const { id } = req.params;
        const tarefas = this.lerTarefas();
        const tarefa = tarefas.find(tarefa => tarefa.id === Number(id));

        if (!tarefa) {
            req.flash('errorMessage', "Tarefa não encontrada!");  // Adiciona a mensagem de erro
            return res.redirect('/');  // Redireciona após a adição da mensagem de erro
        }

        const novasTarefas = tarefas.filter(tarefa => tarefa.id !== Number(id));
        this.salvarTarefas(novasTarefas);

        req.flash('successMessage', "Tarefa deletada com sucesso!");  // Adiciona a mensagem de sucesso
        return res.redirect('/');  // Redireciona após a operação e a adição da mensagem de sucesso
    }

    async listConcluidas(req, res) {
        const tarefas = this.lerTarefas();
        const tarefasConcluidas = tarefas.filter(tarefa => tarefa.situacao === 'concluida'); // Filtra apenas as pendentes
        res.render('home/concluidas', { tarefas: tarefasConcluidas });
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

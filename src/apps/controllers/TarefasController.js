class TarefasController {
    async list(req, res) {
        res.render('home/index');
    }

    async cadastrar(req, res) {
        res.render('home/formulario');
    }
}

module.exports = new TarefasController();

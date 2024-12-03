class TarefasController {
    async list(req, res) {
        res.render('home/index');
    }
}

module.exports = new TarefasController();

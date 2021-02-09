const Task = require('../../../models/Task');
require('../../../models/Degree');

export default async (req, res) => {

    const limit = req.body.limit || 0;
    const page = req.body.page * limit || 0;

    try {
        const tasks = await Task.find({})
                            .populate('degree')
                            .limit(limit)
                            .skip(page);
        res.json({ ok: true, tasks });
    } catch (e) {
        console.log(e);
        res.json({ errorMsg: 'Erro ao encontrar tarefas.' });
    }

}
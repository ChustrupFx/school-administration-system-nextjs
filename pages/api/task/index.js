const Task = require('../../../models/Task');
require('../../../models/Degree');

export default async (req, res) => {

    const limit = parseInt(req.query.limit) || 0;
    const page = parseInt(req.query.page * limit) || 0;
    
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
const withAuth = require('../../../../../middlewares/server/withAuth');
const Task = require('../../../../../models/Task');
const User = require('../../../../../models/User');

const handler = async (req, res) => {
    const { query: { id } } = req;

    const limit = parseInt(req.query.limit) || 0;
    const page = parseInt((req.query.page - 1) * limit) || 0;

    try {
        const user = await User.findById(id)
            .populate('degree');

        if (!user)
            return res.json({ errorMsg: 'User not found.' });

        const tasks = await Task.find({ degree: user.degree._id })
                                .skip(page)
                                .limit(limit);

        return res.json({ ok: true, tasks });
    } catch (e) {
        console.log(e);
        return res.json({ errorMsg: 'Erro ao tentar encontrar as tarefas do usuário.' });
    }

}

export default withAuth(handler);
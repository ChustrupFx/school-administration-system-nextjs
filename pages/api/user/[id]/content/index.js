const Content = require('../../../../../models/Content');
const User = require('../../../../../models/User');
const Degree = require('../../../../../models/Degree');
const withAuth = require('../../../../../middlewares/server/withAuth');

const handler = async (req, res) => {

    const { query: { id } } = req;

    const limit = parseInt(req.query.limit) || 0;
    const page = parseInt(req.query.page * limit) || 0;

    try {
        const user = await User.findById(id)
                            .populate('degree');
        const degree = user.degree._id;
        const contents = await Content.find({ degree })
                            .limit(limit)
                            .skip(page);
        return res.json({ ok: true, contents });
    } catch (e) {
        console.log(e)
        return res.json({ errorMsg: 'Erro ao encontrar o conteúdo referente ao usuário.' });
    }

}

export default withAuth(handler);
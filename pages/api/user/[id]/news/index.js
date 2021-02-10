const News = require('../../../../../models/News');
const Degree = require('../../../../../models/Degree');
const User = require('../../../../../models/User');
const withAuth = require('../../../../../middlewares/server/withAuth');

const handler = async (req, res) => {
    const { query: { id } } = req;

    try {
        const user = await User.findById(id)
                        .populate('degree');
        const degree = user.degree._id;
        const news = await News.find({ degree });

        return res.json({ ok: true, news });
    } catch(e) {
        return res.json({ errorMsg: 'Erro ao tentar encontrar as notícias referentes ao usuário.' });
    }
}

export default withAuth(handler);
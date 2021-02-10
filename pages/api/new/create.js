const News = require('../../../models/News');

const handler = async (req, res) => {
    const { body } = req;

    try {
        const news = await News.create(body);
        
        return res.json({ ok: true, news });
    } catch (e) {
        return res.json({ errorMsg: 'Erro ao criar uma notícia nova.' });
    }

}

export default handler;
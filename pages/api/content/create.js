const Content = require('../../../models/Content');

export default async function handler(req, res) {
    const { body } = req;

    try {
        const content = await Content.create(body);
        
        res.json({ ok: true, content });
    } catch(e) {
        res.json({ errorMsg: 'Erro ao tentar criar conteúdo.' });
    }
}
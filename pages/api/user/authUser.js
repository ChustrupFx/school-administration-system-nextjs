const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const Degree = require('../../../models/Degree');
const Shift = require('../../../models/Shift');

export default async (req, res) => {
    try {
        const { cookies: {auth_token} } = req;

        if (!auth_token) {
            return res.json({ errorMsg: 'Nenhum usuário autenticado.' });
        }

        if (!await jwt.verify(auth_token, process.env.SECRET_KEY)) {
            return res.json({ errorMsg: 'Token inválido ou expirado.' });
        }

        const decoded = await jwt.decode(auth_token);
        const userId = decoded.userId;
        const user = await User.findById(userId)
                            .populate('degree shift');
        user.password = undefined;

        return res.json({ ok: true, user, token: auth_token });
    } catch(e) {
        console.log(e)
        return res.json({ errorMsg: 'Erro ao tentar achar informações do usuário.' })
    }
}
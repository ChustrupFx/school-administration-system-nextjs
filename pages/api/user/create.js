import User from '../../../models/User';

export default async(req, res) => {

    const { body } = req;

    try {
        if (await User.findOne(body)) {
            return res.json({ errorMsg: 'Usuário já existente.' });
        }
        
        const user = await User.create(body);
        user.password = undefined;

        return res.json({ ok: true, user })
    } catch (e) {
        console.log(e)
        res.json({ errorMsg: 'Erro ao registrar usuário.' });
    }

}


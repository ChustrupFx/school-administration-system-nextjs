import User from '../../../models/User';
import { useRouter } from 'next/router';
 
export default async (req, res) => {
    const { query: { id } } = req;
    try {
        const user = await User.findById(id);

        if (!user)
            return res.json({ errorMsg: 'Usuário não existente.' });

        return res.json({ ok: true, user });

    } catch (e) {
        return res.json({ errorMsg: 'Erro ao carregar informações do usuário.' });
    }
}
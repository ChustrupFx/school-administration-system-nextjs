import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res) => {
    const { body: { registrationCode, password } } = req;

    try {
        const user = await User.findOne({ registrationCode })
                        .select('+password');

        if (!user || !await bcrypt.compare(password, user.password)) 
            return res.json({ errorMsg: 'Email ou senha incorretos.' });

        const token = await jwt.sign({ ...user }, process.env.SECRET_KEY);
        user.password = undefined;

        return res.json({ ok: true, user, token });
    } catch (e) {
        return res.json({ errorMsg: 'Erro ao fazer o login do usuário.' });
    }
}
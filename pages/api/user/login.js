import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cookie from 'cookie';
dotenv.config();

export default async (req, res) => {
    const { body: { registrationCode, password } } = req;

    try {
        const user = await User.findOne({ registrationCode })
                        .select('+password');
        
        if (!user || !isPasswordCorrect(password, user.password)) 
            return res.json({ errorMsg: 'Email ou senha incorretos.' });
        
        user.password = undefined;
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        setTokenCookie(token);
        
        return res.json({ ok: true, token });
    } catch (e) {
        console.log(e);
        return res.json({ errorMsg: 'Erro ao fazer o login do usuário.' });
    }

    function isPasswordCorrect(password, userPassword) {
        const result = bcrypt.compareSync(password, userPassword);
        return result;
    }

   function setTokenCookie(token) {
       res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
           httpOnly: true,
           maxAge: 60 * 60 * 24,
           sameSite: 'strict',
           secure: process.env.NODE_ENV !== 'development',
           path: '/'
       }));
   }
}
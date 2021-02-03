const jwt = require('jsonwebtoken');

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
        const user = decoded._doc;
        user.password = undefined;

        return res.json({ ok: true, user });
    } catch(e) {
        return res.json({ errorMsg: 'Erro ao tentar achar informações do usuário.' })
    }
}

export async function getServerSideProps({ req }) {
    console.log(req.headers);
}
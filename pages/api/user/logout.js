const cookie = require('cookie');

export default (req, res) => {
    const auth_token = req.cookies.auth_token;

    if (!auth_token) 
        return res.json({ errorMsg: 'Nenhum usuário autenticado.' });
    
    removeTokenCookie();

    return res.json({ ok: true });

    function removeTokenCookie() {
        res.setHeader('Set-Cookie', cookie.serialize('auth_token', null, {
            maxAge: 0,
            secure: false,
            path: '/',
            httpOnly: true,
            sameSite: true,        
        }));
    }
}
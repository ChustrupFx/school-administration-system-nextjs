const jwt = require('jsonwebtoken');
require('dotenv').config();

function withAuth(handler) {
    return (req, res) => {
        const { headers: { authorization } } = req;

        if (!authorization)
            return res.status(401).json({ errorMsg: 'No authorization header found.' });

        const parts = authorization.split(' ');

        if (parts.length !== 2)
            return res.status(401).json({ errorMsg: 'Token malformatted.' });

        const [scheme, token] = parts;

        if (!/^Bearer$/g.test(scheme))
            return res.status(401).json({ errorMsg: 'Invalid scheme.' });

        if (!jwt.verify(token, process.env.SECRET_KEY))
            return res.status(401).json({ errorMsg: 'Invalid token.' });

        return handler(req, res);
    }

}

module.exports = withAuth;
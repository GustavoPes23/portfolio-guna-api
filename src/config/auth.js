require('dotenv').config({ path: '../../.env' });

const jwt = require('jsonwebtoken');

function generateToken({ user, pass }) {
    const payload = {
        role: "admin",
        user,
        pass
    };

    const secret = process.env.AUTH_JWT;

    const options = {
        expiresIn: '24h'
    };

    return jwt.sign(payload, secret, options);
}

function verifyToken(req, res, next) {
    const auth = req.headers['authorization'].split(" ");

    if (!auth) {
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    const token = auth[1] || auth[0];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.AUTH_JWT, (err) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        next();
    });
}

module.exports = { generateToken, verifyToken };

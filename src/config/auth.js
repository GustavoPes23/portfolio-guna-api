import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../../.env' });

function getPayload({ user, pass }) {
    return {
        role: "admin",
        user,
        pass
    };
}

function getOptionsJWT() {
    return {
        expiresIn: '1h'
    };
}

function getSecretJWT() {
    return process.env.AUTH_JWT;
}

function validateSecretJWT(secret) {
    if (!secret) {
        throw new Error('JWT Secret não informado');
    }
}

function generateToken(req) {
    try {
        const payload = getPayload(req);
        const secret = getSecretJWT();

        validateSecretJWT(secret);

        const options = getOptionsJWT();

        return jwt.sign(payload, secret, options);
    } catch (error) {
        throw new Error(error?.message);
    }
}

function getAuthTokenHeaders(req) {
    return req.headers['authorization'];
}

function validateAuthToken(authToken) {
    if (!authToken) {
        throw new Error('Token não fornecido.');
    }
}

function validateTokenVerify(err) {
    if (err) {
        throw new Error('Token inválido.');
    }
}

function verifyToken(req, res, next) {
    try {
        const authToken = getAuthTokenHeaders(req);
        const secret = getSecretJWT();

        validateAuthToken(authToken);

        jwt.verify(authToken, secret, (err) => {
            validateTokenVerify(err);
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { generateToken, verifyToken }

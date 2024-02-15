const { insert, findUser } = require("../config/db");
const { generateToken } = require("../config/auth");

const { COLLECTION_USERS } = require("../config/collections");

async function doPost(req, res) {
    const { user, pass } = req.body;

    const token = generateToken({ user, pass }, res);

    try {
        const User = {
            user,
            pass,
            token
        };

        await insert(User, COLLECTION_USERS);

        return res.status(201).json({
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function doPostAuth(req, res) {
    const { user, pass } = req.body;

    try {
        if (!user || !pass) {
            throw new Error("Missing data.");
        }

        const User = await findUser({ user, pass }, COLLECTION_USERS);

        if (User) {
            const token = generateToken({ user, pass }, res);

            return res.status(200).json({
                success: true,
                token
            });
        }

        return res.status(400).json({
            success: false,
            message: 'Not found.'
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { doPost, doPostAuth };

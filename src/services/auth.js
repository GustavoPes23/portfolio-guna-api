import { insert, findUser } from "../config/db.js";
import { generateToken } from "../config/auth.js";
import { COLLECTION_USERS } from "../config/collections.js";

export async function doPost(req, res) {
    try {
        const { user, pass } = req.body;
        const token = generateToken({ user, pass }, res);
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

function validUser(user) {
    if (!user) {
        throw new Error("Missing user.");
    }
}

function validPassword(pass) {
    if (!pass) {
        throw new Error("Missing password.");
    }
}

export async function doPostAuth(req, res) {
    try {
        const { user, pass } = req.body;

        validUser(user);
        validPassword(pass);

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

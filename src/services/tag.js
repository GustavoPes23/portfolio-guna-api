const { findById, findAll, insert, findByCode } = require("../config/db");

const { COLLECTION_TAG } = require("../config/collections");

async function doGetByCode(req, res) {
    try {
        const tagCode = req.params.code;
        const tag = await findByCode(tagCode, COLLECTION_TAG);

        if (tag) {
            return res.status(200).json({
                success: true,
                result: tag
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

async function doPost(req, res) {
    try {
        const { code, description } = req.body;

        if (!code) {
            throw new Error("Missing code.");
        }

        if (!description) {
            throw new Error("Missing description.");
        }

        const tag = {
            code,
            description
        };

        await insert(tag, COLLECTION_TAG);

        return res.status(200).json({
            success: true,
            result: tag
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function doGetAll(_, res) {
    try {
        const result = await findAll(COLLECTION_TAG);

        return res.status(200).json({
            success: true,
            result
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { doGetByCode, doPost, doGetAll };

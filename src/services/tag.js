import { findByCode, insert, findAll } from "../config/db.js";
import { COLLECTION_TAG } from "../config/collections.js";

export async function doGetByCodeTag(req, res) {
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

export async function doPostTag(req, res) {
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

export async function doGetAllTag(_, res) {
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

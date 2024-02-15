const { findById, findAll, insert, update, findByCode } = require("../config/db");

const { COLLECTION_ITEMS, COLLECTION_TAG } = require("../config/collections");

async function doGetById(req, res) {
    const itemId = req.params.id;

    try {
        const item = await findById(itemId, COLLECTION_ITEMS);

        if (item) {
            return res.status(200).json({
                success: true,
                result: item
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
        const { name, code_tag } = JSON.parse(req.body.formData);
        const { uploadedFile, file } = req;

        const tag = await findByCode(code_tag, COLLECTION_TAG);

        if (!tag) {
            throw new Error("Tag not found");
        }

        const item = {
            name,
            image: {
                src: uploadedFile.secure_url,
                alt: file.originalname,
            },
            tag
        };

        await insert(item, COLLECTION_ITEMS);

        return res.status(200).json({
            success: true,
            result: item
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
        const result = await findAll(COLLECTION_ITEMS);

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

async function doUpdate(req, res) {
    const id = req.params.id;
    const { name, href, tag } = req.body;

    try {
        const item = {};

        name && (item.name = name);
        href && (item.href = href);
        tag && (item.tag = tag);

        const result = await update(id, item, COLLECTION_ITEMS);

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

module.exports = { doGetById, doPost, doGetAll, doUpdate };

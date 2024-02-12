const Item = require('../models/Item');
const PaginatedResults = require('../component/paginatedResults');
const { findById, findAll, insert, update } = require("../config/db");

async function doGetById(req, res) {
    const itemId = req.params.id;

    try {
        const item = await findById(itemId);

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
    const { name, href, tag } = JSON.parse(req.body.formData);
    const { uploadedFile, file } = req;

    try {
        const item = {
            name,
            href,
            image: {
                imageSrc: uploadedFile.secure_url,
                imageAlt: file.originalname,
            },
            tag
        };

        await insert(item);

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
        const result = await findAll();

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

        const result = await update(id, item);

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

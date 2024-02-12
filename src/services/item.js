const Item = require('../models/Item');
const PaginatedResults = require('../component/paginatedResults');
const { findById, findAll, insert } = require("../config/db");
const fs = require("fs");

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
    const file = req.file;
    const { name, href, tag } = JSON.parse(req.body.formData);

    try {
        const item = {
            name,
            href,
            image: {
                imageSrc: fs.readFileSync(file.path),
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

module.exports = { doGetById , doPost, doGetAll };

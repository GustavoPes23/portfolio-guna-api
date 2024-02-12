const Item = require('../models/Item');
const PaginatedResults = require('../component/paginatedResults');
const { findAll, insert } = require("../config/db");

module.exports = {

    async doGetById(req, res) {
        const itemId = req.params.id;

        try {
            const item = await Item.findById(itemId);

            if (item) {
                return res.status(200).json({
                    success: true,
                    result: item
                });
            }
            else
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
    },

    async doPost(req, res) {
        const file = req.file;
        const { name, href, tag } = JSON.parse(req.body.formData);

        try {
            const item = {
                name,
                href,
                image: {
                    imageSrc: file.location,
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
    },

    async doGetAll(req, res) {
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
    },

};

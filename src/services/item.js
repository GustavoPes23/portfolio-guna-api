import { findById, findAll, insert, update, findByCode } from "../config/db.js";
import { COLLECTION_ITEMS, COLLECTION_TAG } from "../config/collections.js";

export async function doGetByIdItems(req, res) {
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

export async function doPostItems(req, res) {
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

export async function doGetAllItems(_, res) {
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

export async function doUpdateItems(req, res) {
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

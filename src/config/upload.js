import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

dotenv.config();
process.setMaxListeners(15);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single("file");

cloudinary.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

async function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

async function handler(req, res, next) {
    await runMiddleware(req, res, uploadMiddleware);
    
    const stream = cloudinary.uploader.upload_stream({ folder: "demo" }, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
        req.uploadedFile = result;
        next();
    });

    streamifier.createReadStream(req.file.buffer).pipe(stream);    
}

export default handler;

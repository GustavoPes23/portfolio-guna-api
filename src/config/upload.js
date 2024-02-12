require('dotenv').config({ path: '../../.env' });

const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");
process.setMaxListeners(15);

cloudinary.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

function runMiddleware(req, res, fn) {
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
    
    const stream = await cloudinary.uploader.upload_stream(
        {
            folder: "demo",
        },
        (error, result) => {
            if (error) return console.error(error);
            // res.status(200).json(result);
            req.uploadedFile = result;
            next();
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);    
}

const config = {
    api: {
        bodyParser: false,
    },
};

module.exports = handler;
const Item = require('../models/Item');
const PaginatedResults = require('../component/paginatedResults');

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
            const item = await Item.create({
                name,
                href,
                image: {
                    imageSrc: file.location,
                    imageAlt: file.originalname,
                },
                tag
            });

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

    // async update(req, res) {
    //     try {
    //         const Itemid = req.params.id;
    //         const file = req.file;
    //         const storeid = req.params.storeid;
    //         const { name, index } = JSON.parse(req.body.formData);

    //         const Item = await Item.findById(Itemid);

    //         if (!file) {
    //             Item.updateOne({
    //                 name,
    //                 index,
    //                 store: storeid,
    //                 updatedAt: Date.now()
    //             },
    //                 { new: true }, function (err, p) {
    //                     if (err)
    //                         return res.status(err.statusCode).json({
    //                             success: false,
    //                             message: err.message
    //                         });

    //                     return res.status(200).json({
    //                         success: true,
    //                         message: 'Ok'
    //                     });
    //                 }
    //             )
    //         }
    //         else {
    //             let deletedImageKeys = [];
    //             deletedImageKeys.Add(Item.image.imageKey);

    //             var image = {
    //                 imageURL: file.location,
    //                 imageName: file.originalname,
    //                 imageKey: file.key,
    //                 imageSize: file.size
    //             };

    //             Item.updateOne(
    //                 {
    //                     name,
    //                     index,
    //                     store: storeid,
    //                     updatedAt: Date.now(),
    //                     image
    //                 },
    //                 { new: true }, function (err, p) {
    //                     if (err)
    //                         return res.status(err.statusCode).json({
    //                             success: false,
    //                             message: err.message
    //                         });

    //                     //Tentei fazer uma função separada, porem a todo momento eu recebo um parametro undefiened
    //                     //Provavelmente eu nao sei fazer a função corretamente
    //                     const s3 = new aws.S3({
    //                         accessKeyId: process.env.AWS_ACCESS_KEY_UD,
    //                         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //                         region: process.env.AWS_DEFAULT_REGION
    //                     });

    //                     var params = {
    //                         Bucket: process.env.BUCKET_NAME,
    //                         Delete: {
    //                             Objects: deletedImageKeys
    //                         }
    //                     };
    //                     s3.deleteObjects(params,
    //                         function (err, data) {
    //                             if (err)
    //                                 console.log("Erro na deleção do documento da S3 ao fazer update: " + err);
    //                         }
    //                     );

    //                     return res.status(200).json({
    //                         success: true,
    //                         message: 'Ok'
    //                     });
    //                 }
    //             );
    //         }

    //     }
    //     catch (err) {
    //         return res.status(400).json({
    //             success: false,
    //             message: err.message
    //         });
    //     }

    // },

    async doGetAll(req, res) {
        try {
            const { page = 1, limit = 6, text } = req.query;
            const regex = new RegExp(text, 'i');
    
            const items = await Item.find({ 'name': regex })
                .sort({ 'index': 'desc' })
                .skip((page - 1) * limit)
                .limit(parseInt(limit));
    
            const totalCount = await Item.countDocuments({ 'name': regex });
    
            const result = PaginatedResults.paginate(items, parseInt(page), parseInt(limit), totalCount);
    
            return res.status(200).json({
                success: true,
                result: result,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    },

};

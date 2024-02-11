const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    href:{
        type: String,
    },
    image: {
        imageSrc:{
            type: String,
            required: false,
        },
        imageAlt:{
            type: String,
            required: false,
        }
    },
    tag: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

ItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Item', ItemSchema);
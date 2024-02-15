require('dotenv').config({ path: '../../.env' });

const { MongoClient, ObjectId } = require("mongodb");

async function connect() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const connection = client.db(process.env.MONGO_DATABASE);

    return connection;
}

async function findById(id, collection) {
    const db = await connect();
    return db.collection(collection).findOne({_id: new ObjectId(id)});
}


async function findByCode(code, collection) {
    const db = await connect();
    return db.collection(collection).findOne({ code });
}

async function findUser(data, collection) {
    const db = await connect();
    return db.collection(collection).findOne(data);
}

async function findAll(collection) {
    const db = await connect();
    return db.collection(collection).find().toArray();
}

async function insert(data, collection) {
    const db = await connect();
    return db.collection(collection).insertOne(data);
}

async function update(id, item, collection) {
    const db = await connect();
    return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: item });
}
 
module.exports = { findById, findUser, findAll, insert, update, findByCode }
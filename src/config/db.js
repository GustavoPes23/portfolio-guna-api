require('dotenv').config({ path: '../../.env' });

const { MongoClient, ObjectId } = require("mongodb");
const COLLECTION = "items";

async function connect() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const connection = client.db(process.env.MONGO_DATABASE);

    return connection;
}

async function findById(id) {
    const db = await connect();
    return db.collection(COLLECTION).findOne({_id: new ObjectId(id)});
}

async function findAll() {
    const db = await connect();
    return db.collection(COLLECTION).find().toArray();
}

async function insert(data) {
    const db = await connect();
    return db.collection(COLLECTION).insertOne(data);
}

async function update(id, item) {
    const db = await connect();
    return db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: item });
}
 
module.exports = { findById, findAll, insert, update }
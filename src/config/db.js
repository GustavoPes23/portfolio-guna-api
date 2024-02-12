require('dotenv').config({ path: '../../.env' });

const { MongoClient } = require("mongodb");
const COLLECTION = "items";

async function connect() {
    const client = new MongoClient(process.env.MONGO_URI, {});
    await client.connect();
    const connection = client.db(process.env.MONGO_DATABASE);

    return connection;
}

async function findAll() {
    const db = await connect();
    return db.collection(COLLECTION).find().toArray();
}

async function insert(data) {
    const db = await connect();
    return db.collection(COLLECTION).insertOne(data);
}
 
module.exports = { connect, findAll, insert }
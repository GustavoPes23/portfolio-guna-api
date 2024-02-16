import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

async function connect() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const connection = client.db(process.env.MONGO_DATABASE);

    return connection;
}

export async function findById(id, collection) {
    const db = await connect();
    return db.collection(collection).findOne({ _id: new ObjectId(id) });
}

export async function findByCode(code, collection) {
    const db = await connect();
    return db.collection(collection).findOne({ code });
}

export async function findUser(data, collection) {
    const db = await connect();
    return db.collection(collection).findOne(data);
}

export async function findAll(collection, group = null) {
    const db = await connect();
    const result =  await db.collection(collection).find().toArray();

    if (group === "tag_code") {
        return groupByTagCode(result);
    } 

    return result;
}

function groupByTagCode(items) {
    const groupedItems = {};
    items.forEach(item => {
        const tagCode = item.tag.code;
        if (!groupedItems[tagCode]) {
            groupedItems[tagCode] = [];
        }
        groupedItems[tagCode].push(item);
    });
    return groupedItems;
}

export async function insert(data, collection) {
    const db = await connect();
    return db.collection(collection).insertOne(data);
}

export async function update(id, item, collection) {
    const db = await connect();
    return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: item });
}


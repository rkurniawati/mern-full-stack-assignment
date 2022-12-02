import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';
const MONGO_DATABASE = "dogs";

let dbClient = null;
const connect = async (url) => {
    let client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });    
    return client;
}

const getConnection = async () => {
    if (!dbClient) {
        dbClient = await connect(MONGO_URL);
        if (!dbClient) {
            console.log("Failed to connect to mongodb");
            process.exit(1);
        }
    }
    return dbClient.db(MONGO_DATABASE);
}

const getAllDogs = async () => {
    const database = await getConnection();
    const values = await database.collection("dogs").find({}).toArray();
    return values;
}

const deleteDog = async (tableName, id) => {
    const database = await getConnection();
    await database.collection("dogs").deleteOne({_id: ObjectID(id)});    
}

const addDog = async (tableName, name, age, breed) => {
    const database = await getConnection();
    const dogRecord = {
        "name" : name,
        "age" : age,
        "breed" : breed,
    }
    await database.collection("dogs").insertOne(dogRecord);    
}

const routes = [
    {
        method: 'get',
        path: '/hello',
        handler: async (req, res) => {
            res.send("Hello!");
        },
    },
    {
        method: 'get',
        path: '/dogs',
        handler: async (req, res) => {
            const values = await getAllDogs();
            res.status(200).json(values);
        },
    },
    {
        method: 'post',
        path: '/adddog',
        handler: async (req, res) => {
            const { collection, name, age, breed } = req.body;
            await addDog(collection, name, age, breed);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/deletedog',
        handler: async (req, res) => {
            const { collection, id } = req.body;
            await deleteDog(collection, id);
            res.status(200).json({ status: "ok"});
        },
    },
];

const BACKEND_PORT = 8000;
const app  = express();
app.use(bodyParser.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

const start = async () => {
    await connect(MONGO_URL);
    app.listen(BACKEND_PORT, () => {
        console.log(`Server is up at port ${BACKEND_PORT}`)
    })
    
}
start();

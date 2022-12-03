import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URL = 'mongodb://127.0.0.1:27017';
const MONGO_DATABASE = "test"; // we're using the default test database

let dbClient = null;
const connect = async (url) => {
    let client = await MongoClient.connect(url, {
        directConnection: true,
        appName : "dogs"
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

const deleteDog = async (id) => {
    const database = await getConnection();
    await database.collection("dogs").deleteOne({_id: ObjectId(id)});    
}


const naughtyDog = async (id) => {
    const database = await getConnection();
    const dog = await database.collection("dogs").find({_id: ObjectId(id)}).toArray()
    console.log(dog.id + " " + dog.nice)
    await database.collection("dogs").updateOne({_id: ObjectId(id) }, 
    {
        $set: {
            naughty: dog.naughty + 1
        }
    });    
}

const niceDog = async (id) => {
    // see https://www.mongodb.com/docs/mongodb-shell/crud/update/ for 
    // update example
    const database = await getConnection();
    const dogs = await database.collection("dogs").find({_id: ObjectId(id)}).toArray()
    console.log(id + " " + dogs.length)
    const dog = dogs[0]
    await database.collection("dogs").updateOne({_id: ObjectId(id) }, 
    {
        $set: {
            nice: dog.nice + 1
        }
    });    
}

const addDog = async (name, age, breed, naughty, nice) => {
    const database = await getConnection();
    const dogRecord = {
        "name" : name,
        "age" : age,
        "breed" : breed,
        "naughty": naughty, 
        "nice": nice
    }
    await database.collection("dogs").insertOne(dogRecord);    
}

const routes = [
    {
        method: 'get',
        path: '/',
        handler: async (req, res) => {
            res.send(`Backend server is running, listening at port: ${BACKEND_PORT}\n`);
        },
    },
    {
        method: 'get',
        path: '/hello',
        handler: async (req, res) => {
            res.send("Hello!\n");
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
            const { name, age, breed, naughty, nice } = req.body;
            await addDog(name, age, breed, naughty, nice);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/deletedog',
        handler: async (req, res) => {
            const { id } = req.body;
            await deleteDog(id);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/naughtydog',
        handler: async (req, res) => {
            const { id } = req.body;
            await naughtyDog(id);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/nicedog',
        handler: async (req, res) => {
            const { id } = req.body;
            await niceDog(id);
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

process.on('SIGINT', () => { console.log("Exiting!"); process.exit(); })
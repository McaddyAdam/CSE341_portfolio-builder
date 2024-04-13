const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
dotenv.config()

let db;


const initDb = (callback) => {
    if (db) {
        console.log('Db is already initialized!');
        return callback(null, db);
    }
    MongoClient.connect(process.env.URI)
        .then((client) => {
            db = client;
            callback(null, db);
        })
        .catch((err) => {
            callback(err);
        });
};



const getDb = () => {
    if (!db) {
        throw Error('Db not initialized');
    }
    return db;
};


module.exports = { initDb, getDb };
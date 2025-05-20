const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initdb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }
    
    MongoClient.connect(process.env.MONGODB_URI) 
        .then(client => {
            database = client.db(); 
            callback(null, database);
        })
        .catch(err => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initdb,
    getDatabase
};
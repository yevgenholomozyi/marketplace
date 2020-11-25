const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://Jenya:Jenya@cluster0.qcx6u.mongodb.net/node-complete?retryWrites=true://Jenya:Jenya@cluster0.qcx6u.mongodb.net/node-complete?retryWrites=true')
    
    .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
    })
    .catch(err => {
    console.log(err);
    throw err;
    });
};

const getDb = () => { // returns connection to the database
    if (_db) {
        return _db;
    }
    throw 'No database found';

};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;



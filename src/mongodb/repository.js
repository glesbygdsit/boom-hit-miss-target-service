var MongoClient = require('mongodb').MongoClient;

var mongodbUrl = process.env.MONGODB_URL || 'localhost:27017';

class Repository {
    
    constructor(databaseName, collectionName) {
        this.databaseName = databaseName;
        this.collectionName = collectionName;
        this.connectUrl = mongodbUrl + '/' + databaseName;
    }

    getAll(onError, onSuccess) {
        var databaseName = this.databaseName;
        var collectionName = this.collectionName;

        MongoClient.connect(this.connectUrl, function(err, db) {
            if (err) {
                onError(err);
                db.close();
                throw err;
            }
    
            var database = db.db(databaseName);
    
            if (!database.collection || !database.collection(collectionName)){
                onError(err);
                db.close();
                throw err;
            }
    
            database.collection(collectionName).find({}).toArray(function(err, result) {
                if (err) {
                    onError(err);
                    db.close();
                    throw err;
                }
                onSuccess(result)
                db.close();
              });
        });
    }

    insert(object, onError, onSuccess){
        var databaseName = this.databaseName;
        var collectionName = this.collectionName;

        MongoClient.connect(this.connectUrl, function(err, db) {
            if (err) {
                onError(err);
                db.close();
                throw err;
            }

            var database = db.db(databaseName);

            if (!database.collection || !database.collection(collectionName)){
                database.createCollection(collectionName, function(err, res) {
                    if (err){
                        onError(err);
                        db.close();
                        throw err;
                    } 
                    console.log(`Collection ${collectionName} created`);
                });
            }

            database.collection(collectionName).insertOne(object, function(err, res) {
                if (err){
                    onError(err);
                    db.close();
                    throw err;
                }
                onSuccess(res.insertedId);
                db.close();
            });
        });
    }
}

module.exports = function (databaseName, collectionName) {
    return new Repository(databaseName, collectionName);
}

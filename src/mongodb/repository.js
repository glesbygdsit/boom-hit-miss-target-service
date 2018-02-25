"use strict";

var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
var database;

class Repository {
    constructor(databaseName, collectionName) {
        this.databaseName = databaseName;
        this.collectionName = collectionName;
        this.connectUrl = mongodbUrl + '/' + databaseName;

        MongoClient.connect(this.connectUrl, function(err, db) {
            if (err) {
                console.log(`MongoClient.connect failed, error: ${err}`);
                throw err;
            }
            database = db.db(databaseName);
        });
    }

    getAll(onError, onSuccess){
        this.getDatabaseCollection(onError, function(databaseCollection){
            databaseCollection.find({}).toArray(function(err, res){
                if(err){
                    onError(err);
                    return false;
                }
                onSuccess(res);
                return true;
            });
        });
    }

    insert(object, onError, onSuccess){
        this.getDatabaseCollection(onError, function(databaseCollection){
            databaseCollection.insertOne(object, function(err, res){
                if(err){
                    onError(err);
                    return false;
                }
                onSuccess(res.insertedId);
                return true;
            });
        });
    }

    getDatabaseCollection(onError, fn) {
        var collectionName = this.collectionName;

        if (!database.collection || !database.collection(collectionName)){
            database.createCollection(collectionName, function(err, res) {
                if (err){
                    onError(err);
                    // database.close();
                    throw err;
                }
                console.log(`Collection ${collectionName} created with result ${res}`);
            });
        }
        
        fn(database.collection(collectionName));
    }
}

module.exports = function (databaseName, collectionName) {
    return new Repository(databaseName, collectionName);
};
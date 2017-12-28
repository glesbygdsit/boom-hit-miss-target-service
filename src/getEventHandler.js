var MongoClient = require('mongodb').MongoClient;

module.exports = createEvent;

function createEvent(mongodbConfig, callback){
    MongoClient.connect(mongodbConfig.url, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }

        var database = db.db(mongodbConfig.databaseName);

        if (!database.collection || !database.collection('events')){
            db.close();
            return null;
        }

        database.collection('events').find({}).toArray(function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }

            jsonBody = result;

            callback(jsonBody)

            db.close();
          });
    });
}
var MongoClient = require('mongodb').MongoClient;

module.exports = createEvent;

function createEvent (mongodbConfig, message){
    console.log(message);

    if (message.vibration_factor > 0.5){
        console.log('HIT!');
        message.hit = true;
    }
    else {
        console.log('miss.... lol');
        message.hit = false;
    }

    if (!message.timestamp){
        message.timestamp = new Date().toLocaleString();
    }

    MongoClient.connect(mongodbConfig.url, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }

        var database = db.db(mongodbConfig.databaseName);

        if (!database.collection || !database.collection('events')){
            database.createCollection('events', function(err, res) {
                if (err) throw err;
                console.log('Collection created!');
              });
        }

        database.collection('events').insertOne(message, function(err, res) {
            if (err) {
                console.log(err);
                throw err;
            }
          console.log('1 document inserted');
          db.close();
        });
      });
}
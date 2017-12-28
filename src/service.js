var MongoClient = require('mongodb').MongoClient;
var listen = require('./receive');

var databaseName = 'hitmisstargetservice';
var mongodbUrl = process.env.MONGODB_URL + '/' + databaseName;

console.log(mongodbUrl);

listen('hit-miss-target-event', registerTargetEvent);

function registerTargetEvent (message){
    console.log(message);

    if (message.vibration_factor > 0.5){
        console.log('HIT!');
        message.hit = true;
    }
    else {
        console.log('miss.... lol');
        message.hit = false;
    }

    MongoClient.connect(mongodbUrl, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }

        var database = db.db(databaseName);

        console.log(database.databaseName);

        var myobj = message;
        
        if (!database.collection || !database.collection('events')){
            database.createCollection('eventls', function(err, res) {
                if (err) throw err;
                console.log('Collection created!');
              });
        }

        database.collection('events').insertOne(myobj, function(err, res) {
            if (err) {
                console.log(err);
                throw err;
            }
          console.log('1 document inserted');
          db.close();
        });
      });
}
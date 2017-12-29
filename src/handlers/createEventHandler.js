var databaseName = 'hitmisstargetservice';
var eventRepository = require('../mongodb/repository')(databaseName, 'events');

module.exports = handle;

function handle(hitMissEvent){
    
    console.log(hitMissEvent);

    if (hitMissEvent.vibration_factor > 0.5){
        console.log('HIT!');
        hitMissEvent.hit = true;
    }
    else {
        console.log('miss.... lol');
        hitMissEvent.hit = false;
    }

    if (!hitMissEvent.timestamp){
        hitMissEvent.timestamp = new Date().toLocaleString();
    }

    eventRepository.insert(hitMissEvent, onError,  onSuccess)
}

function onError(){
    console.log(`createEvent handler faied to process request, error: ${err}`);
}

function onSuccess(insertedId){
    console.log(`Successfully handled createEvent request. New event has ID: ${insertedId}`);
}
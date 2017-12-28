var listen = require('./receive');

listen('hit-miss-target-event', registerTargetEvent);

function registerTargetEvent (message){
    console.log(message);

    if (message.vibration_factor > 0.5){
        console.log('HIT!');
    }
    else {
        console.log('miss.... lol');
    }
}
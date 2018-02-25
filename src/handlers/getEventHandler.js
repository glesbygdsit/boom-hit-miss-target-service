"use strict";

var databaseName = 'hitmisstargetservice';
var eventRepository = require('../mongodb/repository')(databaseName, 'events');

module.exports = handle;

function handle(callback){
    eventRepository.getAll(onError, callback);
}

function onError(err){
    console.log(`getEvent handler faied to process request, error: ${err}`);
}
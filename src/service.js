"use strict";

var port = process.env.PORT || 1338;

var restify = require('restify');

var createEventHandler = require('./handlers/createEventHandler');
var getEventsHandler = require('./handlers/getEventHandler');

var server = restify.createServer();
server.get('/events', getEvents);
server.post('/events', createEvent);

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});

function createEvent (request, response, next) {
    getRequestBodyAsJson(request, function (jsonBody) {
        createEventHandler(jsonBody);
        response.send('TODO: Restful created response');
        next();
    });
}

function getEvents (request, response, next) {
    getEventsHandler(function (jsonResponseBody) {
        response.send(jsonResponseBody);
        next();
    });
}

function getRequestBodyAsJson(request, onParsed) {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      var jsonBody = JSON.parse(body);
      onParsed(jsonBody);
    });
}
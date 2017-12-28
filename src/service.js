var restify = require('restify');
var createEventHandler = require('./createEventHandler');
var getEventsHandler = require('./getEventHandler');
var port = process.env.PORT || 1338;
var databaseName = process.env.MONGODB_DATABASE_NAME || 'hitmisstargetservice';

var mongodbConfig = {
    databaseName: databaseName,
    url: process.env.MONGODB_URL + '/' + databaseName
};

var server = restify.createServer();
server.get('/events', getEvents);
server.post('/events', createEvent);

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
})

function createEvent (request, response, next) {
    getRequestBodyAsJson(request, function (jsonBody) {
        createEventHandler(mongodbConfig, jsonBody);
        response.send('TODO: Restful created response');
        next();
    });
};

function getEvents (request, response, next) {
    getEventsHandler(mongodbConfig, function (jsonResponseBody) {
        response.send(jsonResponseBody);
        next();
    });
};

function getRequestBodyAsJson(request, onParsed) {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      var jsonBody = JSON.parse(body);
      onParsed(jsonBody);
    });
};
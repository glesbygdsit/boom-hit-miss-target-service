var amqp = require('amqplib/callback_api');

module.exports = listen;

function listen(queue, onReceive) {
  amqp.connect(process.env.RABGLITMQ, function(err, conn) {
    if (err) {
        console.log(err);
      }
      conn.createChannel(function(err, ch) {
        if (err) {
            console.log(err);
          }
        var q = queue;

        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s.", q);

        ch.consume(q, function (msg) {
          var json = JSON.parse(msg.content.toString());
          onReceive(json);
        }, {noAck: true});
      });
    });
}
const stop = (args, message, servers) => {
  var server = servers[message.guild.id];
  if (message.guild.voice.connection) {
    for (var i = server.queue.length - 1; i >= 0; i--) {
      server.queue.splice(i, 1);
    }
    server.dispatcher.end();
    message.channel.send("Leaving");
    console.log("stopped the queue");
  }

  if (message.guild.connection) message.guild.voice.connection.disconnect();
};

module.exports = stop;

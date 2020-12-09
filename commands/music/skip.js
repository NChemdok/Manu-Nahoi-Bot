const skip = (args, message, servers) => {
  var server = servers[message.guild.id];
  if (server.dispatcher) server.dispatcher.end();
  message.channel.send("Skipped");
};

module.exports = skip;

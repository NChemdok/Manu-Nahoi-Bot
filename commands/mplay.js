const ytdl = require("ytdl-core");

var servers = {};

const mplay = (args, message) => {
  if (!args[1]) {
    var songLink = "";
  } else {
    var songLink = args[1].toString();
  }

  function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.play(
      ytdl(server.queue[0], { filter: "audioonly" })
    );
    server.queue.shift();

    server.dispatcher.on("end", function () {
      if (server.queue[0]) {
        play(connection, message);
      } else {
        connecton.disconnect();
      }
    });
  }

  if (!songLink) {
    message.channel.send("Please Provide Song link");
    return;
  }

  if (!message.member.voice.channel) {
    message.channel.send("You must be in a voice channel");
    return;
  }

  if (!servers[message.guild.id])
    servers[message.guild.id] = {
      queue: [],
    };

  var server = servers[message.guild.id];

  server.queue.push(songLink);

  if (!message.guild.voiceConnection)
    message.member.voice.channel.join().then(function (connection) {
      play(connection, message);
    });
};

module.exports = mplay;

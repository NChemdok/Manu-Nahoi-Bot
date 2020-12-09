const ytdl = require("ytdl-core");

const play = (args, message, servers) => {
  if (!args[1]) {
    var songLink = "";
  } else {
    var songLink = args[1].toString();
  }

  async function play(connection, message) {
    var server = servers[message.guild.id];

    var getinfo = await ytdl.getBasicInfo(server.queue[0]);
    var songTitle = getinfo.videoDetails.title;

    server.dispatcher = connection.play(
      ytdl(server.queue[0], { filter: "audioonly" })
    );
    message.channel.send(songTitle + " Added to queue");

    server.dispatcher.on("finish", function () {
      server.queue.shift();

      if (server.queue[0]) {
        play(connection, message);
      } else {
        connection.disconnect();
      }
    });
  }

  if (!songLink) {
    message.channel.send("Song link Required");
    return;
  }

  if (!message.member.voice.channel) {
    message.channel.send("Please Join A Voice Channel");
    return;
  }

  if (!servers[message.guild.id])
    servers[message.guild.id] = {
      queue: [],
    };

  var server = servers[message.guild.id];

  server.queue.push(songLink);
  console.log(server.queue);

  if (!message.guild.voice.channel)
    message.member.voice.channel.join().then(function (connection) {
      play(connection, message);
    });
};

module.exports = play;

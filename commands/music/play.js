const ytdl = require("ytdl-core");

var playerPlaying = false;

const play = async (args, message, servers, command) => {
  if (command == "p") {
    if (!args[1]) {
      var songLink = "";
    } else {
      var songLink = args[1].toString();
    }

    async function getVideoInfo(songLink) {
      var getinfo = await ytdl.getBasicInfo(songLink);
      var songTitle = getinfo.videoDetails.title;

      message.channel.send(songTitle + " Added to queue");
      currentSongTitle = songTitle;
      return;
    }

    async function displayCurrentSongPlaying() {
      var getinfo = await ytdl.getBasicInfo(server.queue[0]);
      var songTitle = getinfo.videoDetails.title;

      message.channel.send("Currently Playing" + songTitle);
      return;
    }

    async function play(connection, message) {
      var server = servers[message.guild.id];

      server.dispatcher = connection.play(
        ytdl(server.queue[0], { filter: "audioonly" })
      );

      playerPlaying = true;

      server.dispatcher.on("finish", function () {
        server.queue.shift();
        if (server.queue[0]) {
          play(connection, message);
        } else {
          connection.disconnect();
        }
      });

      server.dispatcher.on("end", function () {
        playerPlaying = false;
      });

      displayCurrentSongPlaying();
      return;
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

    if (playerPlaying === true) {
      server.queue.push(songLink);
      getVideoInfo(songLink);
    } else if (playerPlaying === false) {
      server.queue.push(songLink);
      if (!message.guild.voiceConnection) {
        await message.member.voice.channel.join().then(function (connection) {
          play(connection, message);
        });
      }
      getVideoInfo(songLink);
    }
    console.log(server.queue);
  } else if (command == "stop") {
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
    playerPlaying = false;
  }
};

module.exports = play;

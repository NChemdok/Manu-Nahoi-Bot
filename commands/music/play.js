const ytdl = require("ytdl-core");

var playerPlaying = false;

const play = async (args, message, servers, command) => {
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

    if (playerPlaying === false) {
      server.dispatcher = connection.play(
        ytdl(server.queue[0], { filter: "audioonly" })
      );
      playerPlaying = true;
      displayCurrentSongPlaying();

      server.dispatcher.on("finish", function () {
        server.queue.shift();
        if (server.queue[0]) {
          playerPlaying = false;
          play(connection, message);
        } else {
          playerPlaying = false;
          connection.disconnect();
        }
      });
    }
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
  if (!message.channel.voiceConnection) {
    const connection = await message.member.voice.channel.join();
    play(connection, message);
  }

  getVideoInfo(songLink);

  console.log(server.queue);
};

module.exports = play;

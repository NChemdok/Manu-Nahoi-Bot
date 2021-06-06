const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const player = async (guild, song, message, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return message.channel.send(
      "No more Songs in Queue, Leaving Voice Channel"
    );
  }
  if (!serverQueue) {
    return;
  }

  const dispatcher = serverQueue.connection.play(
    ytdl(song.url, {
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    })
  );
  dispatcher
    .on("finish", function () {
      serverQueue.songs.shift();
      player(guild, serverQueue.songs[0], message, queue);
    })
    .on("error", (error) => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  function secondsToTime(songDurationInSeconds) {
    var hr = Math.floor(songDurationInSeconds / 3600)
        .toString()
        .padStart(2, "0"),
      min = Math.floor((songDurationInSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      sec = Math.floor(songDurationInSeconds % 60)
        .toString()
        .padStart(2, "0");

    if (Math.floor(songDurationInSeconds / 3600) < 1) {
      return min + " min : " + sec + " sec";
    } else {
      return hr + " hr : " + min + " min : " + sec + " sec";
    }
  }

  const color = "#" + generateRandomColor();
  const resultResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Now playing : 🎧`)
    .setThumbnail("https://s8.gifyu.com/images/logoc770e3d062e8bb72.gif")
    .addFields({ name: song.title, value: secondsToTime(song.duration) });

  try {
    var messageId = await serverQueue.textChannel.send(resultResponse);
    serverQueue.currentMusicPlayingMessageId = messageId.id;
    serverQueue.playbackTimeoutID = setTimeout(
      () => messageId.delete(),
      song.duration * 1000
    );
  } catch {
    console.error();
  }
};

module.exports = player;

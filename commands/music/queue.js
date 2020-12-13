const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const queue = async (message, serverQueue) => {
  var currentSongQueue = [];

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

    return hr + " hr : " + min + " min : " + sec + " sec";
  }

  async function getSongsQueueInfo(serverQueue) {
    if (serverQueue && serverQueue.songs.length) {
      for (var i = 0; i <= serverQueue.songs.length - 1; i++) {
        var songTitle = serverQueue.songs[i].title;
        var songDurationInSeconds = serverQueue.songs[i].duration;
        var formatedDuration = secondsToTime(songDurationInSeconds);
        currentSongQueue.push(
          `[${i + 1}] ${songTitle} | Duration : (${formatedDuration}) `
        );
      }
      const color = "#" + generateRandomColor();
      const finalResponse = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Songs in Queue")
        .setDescription(currentSongQueue);
      message.channel.send(finalResponse);
    } else {
      message.channel.send("Queue Empty! To add songs type *p <song link>");
    }
  }
  if (!serverQueue) {
    return message.channel.send("Bot is Currently not playing");
  }
  getSongsQueueInfo(serverQueue);
};

module.exports = queue;

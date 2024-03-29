const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const queue = async (message, serverQueue) => {
  var currentSongQueue = "";

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

  async function getSongsQueueInfo(serverQueue) {
    if (serverQueue && serverQueue.songs.length > 0) {
      for (var i = 0; i <= serverQueue.songs.length - 1; i++) {
        var songTitle = serverQueue.songs[i].toUpperCase();
        var songNumber = i + 1;
        var songInfoColored = `[${songNumber}] ${songTitle.substring(
          0,
          26
        )}...`;
        if (i > 19) {
          const songsRemaining = serverQueue.songs.length - 25;
          currentSongQueue = `${currentSongQueue} \n And ${songsRemaining} More Songs in Queue`;
          break;
        } else {
          currentSongQueue = currentSongQueue + songInfoColored + "\n";
        }
      }
      const color = "#" + generateRandomColor();
      const finalResponse = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Songs in Queue")
        .setDescription("```css\n" + currentSongQueue + "\n```");
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

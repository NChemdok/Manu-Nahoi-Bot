const ytdl = require("ytdl-core");

const queue = async (args, message, servers) => {
  var currentSongQueue = [];

  async function getSongsQueueInfo(server) {
    message.channel.send("Current Songs in Queue : ");
    if (Array.isArray(server.queue) && server.queue.length) {
      for (var i = 0; i <= server.queue.length - 1; i++) {
        var songLink = server.queue[i];
        var getinfo = await ytdl.getBasicInfo(songLink);
        var songTitle = getinfo.videoDetails.title;
        currentSongQueue.push(songTitle);
      }
      message.channel.send(currentSongQueue);
    } else {
      message.channel.send("Queue Empty to add songs type *p <song link>");
    }
  }

  var server = servers[message.guild.id];
  if (server !== undefined) {
    getSongsQueueInfo(server);
  } else {
    message.channel.send("Bot is Currently not playing");
  }
};

module.exports = queue;

const ytdl = require("ytdl-core");

const queue = async (args, message, servers) => {
  var currentSongQueue = [];

  async function getSongsQueueInfo(server) {
    for (var i = 0; i <= server.queue.length - 1; i++) {
      var songLink = server.queue[i];
      var getinfo = await ytdl.getBasicInfo(songLink);
      var songTitle = getinfo.videoDetails.title;
      currentSongQueue.push(songTitle);
    }
    message.channel.send(currentSongQueue);
  }

  message.channel.send("Current Songs in Queue : ");

  var server = servers[message.guild.id];

  getSongsQueueInfo(server);
};

module.exports = queue;

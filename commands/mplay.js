const play = require("./music/play");
const skip = require("./music/skip");
const stop = require("./music/stop");
const playlistp = require("./music/playlistp");
const q = require("./music/queue");
const remove = require("./music/remove");

const queue = new Map();

const mplay = (args, message, command) => {
  const serverQueue = queue.get(message.guild.id);
  switch (command) {
    case "p":
      play(args, message, serverQueue, queue);
      break;
    case "stop":
      stop(message, serverQueue);
      break;
    case "skip":
      skip(message, serverQueue);
      break;
    case "playlistp":
      playlistp(message, serverQueue, queue);
      break;
    case "remove":
      remove(message, serverQueue);
      break;
    case "q":
      q(message, serverQueue);
      break;
    default:
      message.channel.send("This command is not supported");
  }
};

module.exports = mplay;

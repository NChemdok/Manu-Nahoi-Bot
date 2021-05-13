const play = require("./music/play");
const skip = require("./music/skip");
const stop = require("./music/stop");
const playlistp = require("./music/playlistp");
const q = require("./music/queue");
const remove = require("./music/remove");
const shuffle = require("./music/shuffle");
const pause = require("./music/pause");
const resume = require("./music/resume");

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
    case "shuffle":
      shuffle(message, serverQueue, queue);
      break;
    case "remove":
      remove(message, serverQueue);
      break;
    case "pause":
      pause(message, serverQueue);
      break;
    case "resume":
      resume(message, serverQueue);
      break;
    case "q":
      q(message, serverQueue);
      break;
    default:
      message.channel.send("This command is not supported");
  }
};

module.exports = mplay;

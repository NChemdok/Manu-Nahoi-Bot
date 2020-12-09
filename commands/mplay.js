const play = require("./music/play");
const skip = require("./music/skip");
const stop = require("./music/stop");
const queue = require("./music/queue");

var servers = {};

const mplay = (args, message, command) => {
  switch (command) {
    case "p":
    case "stop":
      play(args, message, servers, command);
      break;
    case "skip":
      skip(args, message, servers);
      break;
    case "q":
      queue(args, message, servers);
      break;
    default:
      message.channel.send("This command is not supported");
  }
};

module.exports = mplay;

const play = require("./music/play");
const skip = require("./music/skip");
const stop = require("./music/stop");
const playlistp = require("./music/playlistp");
const q = require("./music/queue");
const remove = require("./music/remove");
const shuffle = require("./music/shuffle");
const pause = require("./music/pause");
const resume = require("./music/resume");
const spotify = require("./music/spotify");
const allPlaylist = require("./music/allPlaylist");
const deletePlaylist = require("./music/deletePlaylist");
const skipTo = require("./music/skipTo");
const search = require("./music/search");

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
    case "skipto":
      skipTo(message, serverQueue);
      break;
    case "pp":
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
    case "s":
      search(message);
      break;
    case "spotify":
      spotify(message, serverQueue);
      break;
    case "allplaylist":
      allPlaylist(message);
      break;
    case "deleteplaylist":
      deletePlaylist(message);
      break;
    case "q":
      q(message, serverQueue);
      break;
    default:
      message.channel.send("This command is not supported");
  }
};

module.exports = mplay;

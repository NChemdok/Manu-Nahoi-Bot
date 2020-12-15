const musicCommands = (message) => {
  const Discord = require("discord.js");
  const generateRandomColor = require("../../extras/generateRandomColor");
  const commands =
    "*p <Song Link> | Add Song to queue \n" +
    "*skip | Skip Current Song \n" +
    "*stop | Stop Music Playback \n" +
    "*q | List all Songs Currently in queue \n" +
    // "Not Available Yet :P \n" +
    // "*createplaylist <Playlist Name> | Creates own private playlist  \n" +
    // "*playlistaddsong <Playlist Name> <Song Link> | Adds song to your playlist  \n" +
    // "*playlistp <Playlist Name> | Queues all songs from playlist \n" +
    // "*viewplaylist | Shows names of all of your playlist \n" +
    // "*viewplaylistsongs <Playlist Name> | Shows the Songs in Playlist \n" +
    // "*removesong <Playlist Name> <Song Number> | Removes song from the Saved Playlist\n" +
    "More Coming Soon :P";

  const color = "#" + generateRandomColor();
  const commandList = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("All Music Commands")
    .setThumbnail("https://i.ibb.co/JrYB9pG/Manu-Nahoi-Logo.png")
    .setDescription(commands);
  //   message.channel.send("```" + commands + "```");
  message.channel.send(commandList);
};

module.exports = musicCommands;

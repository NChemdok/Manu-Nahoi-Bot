const musicCommands = (message) => {
  const Discord = require("discord.js");
  const generateRandomColor = require("../../extras/generateRandomColor");
  const commands =
    "*p <Song Link> | Add Song to queue \n" +
    "*skip | Skip Current Song \n" +
    "*skipto <Song Number> | Skip to Song Number in Queue \n" +
    "*stop | Stop Music Playback \n" +
    "*pause | Pause Music Playback \n" +
    "*resume | Resume Music Playback \n" +
    "*s <Keywords> | Search Songs/Artist/Anything from Youtube \n" +
    "*spotify <Playlistname> <Playlist Link> | Add tracks from spotify playlist into custom playlist \n" +
    "*shuffle | Randomize the order of songs in playlist \n" +
    "*remove <Song No> | Removes the Song no from Queue \n" +
    "*q | List all Songs Currently in queue \n" +
    "*pp <Playlist Name> | Queues all songs from playlist \n" +
    "*recentp <No of Songs> | Add Recently played songs in queue \n" +
    "*allplaylist | List all the Playlist Names \n" +
    // "Online Dashboard [Click Here to Manage Your Custom Playlist](https://manunahoi.web.app/) \n" +
    // "*createplaylist <Playlist Name> | Creates own private playlist  \n" +
    // "*playlistaddsong <Playlist Name> <Song Link> | Adds song to your playlist  \n" +
    // "*viewplaylistsongs <Playlist Name> | Shows the Songs in Playlist \n" +
    // "*removesong <Playlist Name> <Song Number> | Removes song from the Saved Playlist\n" +
    "More Coming Soon :P";

  const color = "#" + generateRandomColor();
  const commandList = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("All Music Commands")
    .setThumbnail("https://s8.gifyu.com/images/logoc770e3d062e8bb72.gif")
    .setDescription(commands);
  //   message.channel.send("```" + commands + "```");
  message.channel.send(commandList);
};

module.exports = musicCommands;

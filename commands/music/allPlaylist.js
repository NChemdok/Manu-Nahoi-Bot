const firebase = require("firebase-admin");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const allPlaylist = async (message) => {
  var db = firebase.firestore();

  var playlistDetails = "";

  const playlistRef = db
    .collection("user")
    .doc("DiscordID")
    .collection("playlist");

  const doc = await playlistRef.get();

  if (doc.empty) {
    return message.channel.send("No Playlist Exist");
  } else {
    doc.forEach((doc) => {
      playlistDetails = `${playlistDetails}${doc.id} :=: ${
        doc.get("songs").length
      } Songs\n`;
    });
  }

  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Playlist Details")
    .setDescription("```css\n" + playlistDetails + "\n```");
  message.channel.send(finalResponse);
};

module.exports = allPlaylist;

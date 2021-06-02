const firebase = require("firebase-admin");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const allPlaylist = async (message) => {
  const userName = message.mentions.users.first() || message.author;
  const discordUserID = userName.id.toString().trim();

  var db = firebase.firestore();

  var playlistDetails = "";

  const playlistRef = db
    .collection("user")
    .doc(discordUserID)
    .collection("playlist");

  const doc = await playlistRef.get();

  if (doc.empty) {
    return message.channel.send(
      "No Playlist Exist. Type *helpmusic for more info !!!"
    );
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
    .setTitle(`Playlist of ${userName.username}`)
    .setDescription("```css\n" + playlistDetails + "\n```");
  message.channel.send(finalResponse);
};

module.exports = allPlaylist;

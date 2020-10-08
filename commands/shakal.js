const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const shakal = (message) => {
  const user = message.mentions.users.first() || message.author;
  const color = "#" + generateRandomColor();
  const avatarEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(user.username + " Laga Shakal")
    .setImage(user.displayAvatarURL({ size: 4096 }));
  message.channel.send(avatarEmbed);
};

module.exports = shakal;

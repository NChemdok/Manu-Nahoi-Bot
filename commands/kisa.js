const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kisa = (message, storyString) => {
  const user = message.author;
  let newStoryText = "\n[" + user.username + "] " + message.content.slice(5);
  storyString.push(newStoryText);
  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(storyString);
  message.channel.send(finalResponse);
};

module.exports = kisa;

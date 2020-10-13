const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const homai = (message) => {
  const user = message.mentions.users.first() || message.author;

  var textArray = [
    "Na humai",
    "Standing homai jai",
    "bacha nishina homai",
    "theng nadulai na homai",
    "lengta homai",
    "diaper lagai na homai",
    "suku khuli na homai",
    "shoe lagai na homai",
    "ghor bahar te homai",
    "light on kurina homai, bhui hoa kar ne",
    "dosta alarm rakhina homai",
  ];
  var textSize = Math.floor(Math.random() * textArray.length);
  var randomPower = textArray[textSize];
  var commandResponse = user.username + " tu " + randomPower;
  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(commandResponse);
  message.channel.send(finalResponse);
};

module.exports = homai;

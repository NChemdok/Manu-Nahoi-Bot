const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kikhaishe = (message) => {
  const user = message.mentions.users.first() || message.author;
  var textArray = [
    "Axone",
    "Murgi",
    "Sukha Mass",
    "Panni",
    "Alu",
    "Dal Fry",
    "Dal Boil",
    "Salad",
    "Anda",
    "Pas Tenga",
    "Lai Pata",
    "Sskoss",
    "karela",
    "Anishi",
    "Mar",
    "Gahuri Mangsoo",
    "Suku Pani",
  ];

  var randomNumber = Math.floor(Math.random() * textArray.length);
  var khaishe = user.username + " " + textArray[randomNumber] + " Khaishe";
  const color = "#" + generateRandomColor();
  const commandResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(khaishe);
  message.channel.send(commandResponse);
};

module.exports = kikhaishe;

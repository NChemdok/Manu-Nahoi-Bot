const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kipare = (message) => {
  const user = message.mentions.users.first() || message.author;

  var powerArray = [
    "2 min noodles 1 min te pakawo",
    "Nasai na exam te cheat kuriwo",
    "Matha te anda fry kuriwo",
  ];
  var powerSize = Math.floor(Math.random() * powerArray.length);
  var randomPower = powerArray[powerSize];
  var commandResponse = user.username + " tu " + randomPower + " pare ";
  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(commandResponse);
  message.channel.send(finalResponse);
};

module.exports = kipare;

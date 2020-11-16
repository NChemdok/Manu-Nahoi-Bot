const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");
var myjoke = require("make-me-laugh");

const joke = (message) => {
  var joke = myjoke.getjoke();
  const user = message.mentions.users.first() || message.author;

  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Here's A Joke For You " + user.username)
    .setDescription(joke);
  message.channel.send(finalResponse);
};

module.exports = joke;

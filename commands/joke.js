const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");
const oneLinerJoke = require("one-liner-joke");

const joke = (message) => {
  var getRandomJoke = oneLinerJoke.getRandomJoke();
  const user = message.mentions.users.first() || message.author;

  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Here's A Joke For You " + user.username)
    .setDescription(getRandomJoke.body);
  message.channel.send(finalResponse);
};

module.exports = joke;

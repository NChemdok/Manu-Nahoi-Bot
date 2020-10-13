const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const sundor = (message) => {
  const user = message.mentions.users.first() || message.author;
  const randomNumber = Math.floor(Math.random() * (11 - 0 + 1)) + 0;

  if (randomNumber === 0) {
    printMessage(
      user.username + " Laga Shakal eman biya scale detect wi nakure"
    );
  } else if (randomNumber === 11) {
    printMessage(user.username + " Tu Eman Sundor... Scale biya hoishe");
  } else {
    printMessage(
      user.username +
        " Sundor Scale te apuni laga score " +
        randomNumber +
        " ase"
    );
  }

  function printMessage(messageText) {
    const color = "#" + generateRandomColor();
    const finalResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(messageText);
    message.channel.send(finalResponse);
  }
};

module.exports = sundor;

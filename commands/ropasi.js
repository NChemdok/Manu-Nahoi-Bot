const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const ropasi = (message) => {
  const user = message.author;
  let userChoice = message.content.slice(8).toUpperCase().trim();
  const choicesList = ["PATHOR", "KAGOS", "KENCHI"];

  var choiceRandom = Math.floor(Math.random() * choicesList.length);

  var botChoice = choicesList[choiceRandom];

  if (userChoice === "KAGOS") {
    if (botChoice === "KENCHI") {
      printWinner(message, user, userChoice, botChoice, "Manu Nahoi");
    } else {
      if (botChoice === "PATHOR") {
        printWinner(message, user, userChoice, botChoice, user.username);
      }
    }
  } else if (userChoice === "KENCHI") {
    if (botChoice === "PATHOR") {
      printWinner(message, user, userChoice, botChoice, "Manu Nahoi");
    } else {
      if (botChoice === "KAGOS") {
        printWinner(message, user, userChoice, botChoice, user.username);
      }
    }
  } else if (userChoice === "PATHOR") {
    if (botChoice === "KAGOS") {
      printWinner(message, user, userChoice, botChoice, "Manu Nahoi");
    } else {
      if (botChoice === "KENCHI") {
        printWinner(message, user, userChoice, botChoice, user.username);
      }
    }
  } else {
    message.channel.send(
      "Etu Tho Option Te Nai De. Use Pathor, Kagos or Kenchi"
    );
  }
};

const printWinner = (message, user, userChoice, botChoice, messageText) => {
  const color = "#" + generateRandomColor();
  const resultResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("ROPASI Result")
    .setThumbnail(
      "https://lh3.googleusercontent.com/3j6a5eK-zPFi2VoRFnCgKOIg1_Z9yejaY_HtA169ZWY7JPVCfOp7HfANs3YY1fHDhNk"
    )
    .addFields(
      { name: user.username + " picked ", value: userChoice, inline: true },
      { name: "Manu Nahoi Picked ", value: botChoice, inline: true },
      { name: "Winner", value: messageText + " Wins" }
    );
  message.channel.send(resultResponse);
};

module.exports = ropasi;

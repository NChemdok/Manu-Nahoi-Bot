const fetch = require("node-fetch");
const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const joke = async (message) => {
  const url = "https://sv443.net/jokeapi/v2/joke/Any?format=txt";
  async function getData(url) {
    const response = await fetch(url);

    return response.text();
  }

  const jokeText = await getData(url);
  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(jokeText);
  message.channel.send(finalResponse);
};

module.exports = joke;

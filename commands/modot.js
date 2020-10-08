const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const modot = (message) => {
  const commands =
    "*kikhaishe <User> | To Show what they ate \n" +
    "*shakal <User> | To Show Profile Picture \n" +
    "*ping | To test if Bot Server Active \n" +
    "*gosol <user> | To see if took Bath \n" +
    "*kimanmanu | Shows No of people Online \n" +
    "*kimanderi <user> <user> | Tells how long the two will last if a couple \n" +
    "*kunase <user> | Randomly Selects a Person and shows how they are related \n" +
    "*kipare <user> | Tells what super power tagged user has \n" +
    "More Coming Soon";

  const color = "#" + generateRandomColor();
  const commandList = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("List of Commands")
    .setThumbnail("https://i.ibb.co/nQh9t25/images.png")
    .setDescription(commands);
  //   message.channel.send("```" + commands + "```");
  message.channel.send(commandList);
};

module.exports = modot;

const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const modot = (message) => {
  const commands =
    "*kikhaishe <@User> | To Show what they ate \n" +
    "*shakal <@User> | To Show Profile Picture \n" +
    "*ping | To test if Bot Server Active \n" +
    "*gosol <@user> | To see if took Bath \n" +
    "*kimanmanu | Shows No of people Online \n" +
    "*kimanderi <@user> <@user> | Tells how long the two will last if a couple \n" +
    "*kunase <@user> | Randomly Selects a Person and shows how they are related \n" +
    "*kipare <@user> | Tells what super power tagged user has \n" +
    "*kobi <Custom Text> | Make the bot say something \n" +
    "*hosaase <@user> | Generates a Random Approved Meme \n" +
    "*hobo? | Ask the bot if something will happen\n" +
    "*kiley? | Bot will tell you the reason for the previous command\n " +
    "*ropasi <Choice> | Simple Rock Paper Scissor Game \n" +
    "*kisa <Story Text> | add text to current story \n" +
    "*kisareset | Resets the Story \n" +
    "*saap | Replica of Snakes and ladder game\n" +
    "*sundor <@user> | Grades you level of attraction\n" +
    "*homai <@user> | tells about sleep schedule\n" +
    "*kikoishe <@user> | What did the mentioned person say?\n" +
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

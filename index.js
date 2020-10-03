const Discord = require("discord.js");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
console.log(process.env.BOT_TOKEN);
const prefix = "#";

client.on("message", function (message) {
  console.log("Server Live");
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  //Removes the Prefix
  const commandBody = message.content.slice(prefix.length);

  //Splits the args
  const args = commandBody.split(" ");

  //Converts cmds to lowercase
  const command = args.shift().toLowerCase();

  //Specify commands here
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "kobi") {
    var textArray = ["hello", "there"];
    var randomNumber = Math.floor(Math.random() * textArray.length);
    message.reply(textArray[randomNumber]);
  }
});

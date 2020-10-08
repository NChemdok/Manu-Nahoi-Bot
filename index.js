const Discord = require("discord.js");
const ping = require("./commands/ping");
const shakal = require("./commands/shakal");
const kikhaishe = require("./commands/kikhaishe");
const gosol = require("./commands/gosol");
const kimanmanu = require("./commands/kimanmanu");
const kunase = require("./commands/kunase");
const modot = require("./commands/modot");
const kipare = require("./commands/kipare");

const client = new Discord.Client();

const imageOsa = "./images/oneman.jpg";

client.login(process.env.BOT_TOKEN);
const prefix = "*";

client.on("message", function (message) {
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
    ping(message);
  } else if (command === "kobi") {
    var textArray = ["hello", "there"];
    var randomNumber = Math.floor(Math.random() * textArray.length);
    message.reply(textArray[randomNumber]);
  } else if (command === "shakal") {
    shakal(message);
  } else if (command === "kikhaishe") {
    kikhaishe(message);
  } else if (command === "gosol") {
    gosol(message);
  } else if (command === "kimanmanu") {
    kimanmanu(message);
  } else if (command === "kimanderi") {
    message.channel.send("Olop Hoa Nai de Maaf :P");
  } else if (command === "kunase") {
    kunase(message);
  } else if (command === "kipare") {
    kipare(message);
  } else if (command === "kiara") {
    message.channel.send("What to do ho.. Najane");
  } else if (command === "kuku") {
    message.channel.send("Etu wi What to do ho.. Najane");
  } else if (command === "kisa") {
    ////
  } else if (command === "lastmanu") {
    const imageURL = "https://i.ibb.co/Fh1hZT6/lastmanu.jpg";

    message.channel.send({
      embed: {
        color: 3447003,
        description: "For Limitted Time Only",
        image: { url: imageURL },
      },
    });
  } else if (command === "modot") {
    modot(message);
  }
});

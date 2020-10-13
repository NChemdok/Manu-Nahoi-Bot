const Discord = require("discord.js");
const ping = require("./commands/ping");
const shakal = require("./commands/shakal");
const kikhaishe = require("./commands/kikhaishe");
const gosol = require("./commands/gosol");
const kimanmanu = require("./commands/kimanmanu");
const kunase = require("./commands/kunase");
const modot = require("./commands/modot");
const kipare = require("./commands/kipare");
const kobi = require("./commands/kobi");
const kisa = require("./commands/kisa");
const spampls = require("./commands/spampls");
const hosaase = require("./commands/hosaase");
const ropasi = require("./commands/ropasi");
const hobo = require("./commands/hobo");
const kiley = require("./commands/kiley");
const kimanderi = require("./commands/kimanderi");
const saap = require("./commands/saap");
const sundor = require("./commands/sundor");
const kiara = require("./commands/kiara");
const homai = require("./commands/homai");
const reply = require("./commands/reply");
const generateRandomColor = require("./extras/generateRandomColor");

const client = new Discord.Client();
const storyString = new Array();
const playerQueue = new Array();

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
  } else if (command === "shakal") {
    shakal(message);
  } else if (command === "kikhaishe") {
    kikhaishe(message);
  } else if (command === "gosol") {
    gosol(message);
  } else if (command === "kimanmanu") {
    kimanmanu(message);
  } else if (command === "kimanderi") {
    kimanderi(message);
  } else if (command === "kunase") {
    kunase(message);
  } else if (command === "kipare") {
    kipare(message);
  } else if (command === "kobi") {
    kobi(message);
  } else if (command === "kiara") {
    kiara(message);
  } else if (command === "kuku") {
    message.channel.send("Etu wi What to do ho.. Najane");
  } else if (command === "kisa") {
    kisa(message, storyString);
  } else if (command === "kisareset") {
    storyString.splice(0, storyString.length);
    message.channel.send("Kisa Hari Jai She");
  } else if (command === "spampls") {
    spampls(message);
  } else if (command === "hosaase") {
    hosaase(message);
  } else if (command === "ropasi") {
    ropasi(message);
  } else if (command === "hobo?") {
    hobo(message);
  } else if (command === "kiley?") {
    kiley(message);
  } else if (command === "saap") {
    saap(message, playerQueue);
  } else if (command === "sundor") {
    sundor(message);
  } else if (command === "homai") {
    homai(message);
  } else if (command === "reply") {
    //reply(message, playerQueue);
  } else if (command === "avila") {
    const imageUrl = "https://i.ibb.co/Wg9mngM/small-gu.jpg";
    //https://i.ibb.co/DbDLxtC/small-cat.jpg"
    const color = "#" + generateRandomColor();
    message.channel.send({
      embed: {
        color: color,
        description: "Avilas' Smallest Guinea Pig",
        image: { url: imageUrl },
      },
    });
  } else if (command === "vivila") {
    const imageUrl = "https://i.ibb.co/DbDLxtC/small-cat.jpg";
    const color = "#" + generateRandomColor();
    message.channel.send({
      embed: {
        color: color,
        description: "Avilas' Cat",
        image: { url: imageUrl },
      },
    });
  } else if (command === "modot") {
    modot(message);
  } else {
    message.channel.send(
      "Etu tho Napare De... Modot lage koi le *modot type kuriwi"
    );
  }
});

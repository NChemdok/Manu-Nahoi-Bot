const Discord = require("discord.js");
const keepAlive = require("./extras/keepAlive");
const ping = require("./commands/ping");
const shakal = require("./commands/shakal");
const kikhaishe = require("./commands/kikhaishe");
const gosol = require("./commands/gosol");
// const kimanmanu = require("./commands/kimanmanu");
// const kunase = require("./commands/kunase");
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
const kikoishe = require("./commands/kikoishe");
const sloth = require("./commands/sloth");
const mutameow = require("./commands/mutameow");
const xmas = require("./commands/xmas");
const newyear = require("./commands/newyear");
const kuku = require("./commands/kuku");
const joke = require("./commands/joke");
const mplay = require("./commands/mplay");
const helpMusic = require("./commands/music/musicCommands");
const disconnect = require("./commands/disconnect");

const client = new Discord.Client();
const storyString = new Array();
const playerQueue = new Array();

var server_port = process.env.PORT || 5000;
var server_host = "0.0.0.0";
server.listen(server_port, server_host, function () {
  console.log(`port ${server_port}`);
});

client.login(process.env.BOT_TOKEN);
const prefix = "*";

client.once("ready", () => {
  console.log("Ready!");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.listen(process.env.PORT || 5000);

client.on("message", function (message) {
  keepAlive();
  if (message.author.bot) return;
  if (message.mentions.members.first() !== undefined) {
    if (message.mentions.members.first().id === "761892006263390210") {
      message.reply("Moi la Prefix * ase");
    }
  }
  if (message.content.includes("chup") || message.content.includes("Chup")) {
    message.reply(" Tui hi Chup");
  }
  if (!message.content.startsWith(prefix)) return;

  //Removes the Prefix
  const commandBody = message.content.slice(prefix.length);

  //Splits the args
  const args = commandBody.split(" ");

  //Converts cmds to lowercase
  const command = args[0].toString().toLowerCase();

  //Specify commands here
  switch (command) {
    case "ping":
      ping(message);
      break;
    case "shakal":
      shakal(message);
      break;
    case "kikhaishe":
      kikhaishe(message);
      break;
    case "gosol":
      gosol(message);
      break;
    // case "kimanmanu":
    //   kimanmanu(message);
    //   break;
    case "kimanderi":
      kimanderi(message);
      break;
    // case "kunase":
    //   kunase(message);
    //   break;
    case "kikhaishe":
      kikhaishe(message);
      break;
    case "kipare":
      kipare(message);
      break;
    case "kobi":
      kobi(message);
      break;
    case "kiara":
      kiara(message);
      break;
    case "kuku":
      kuku(message);
      break;
    case "kisa":
      kisa(message, storyString);
      break;
    case "kisareset":
      storyString.splice(0, storyString.length);
      message.channel.send("Kisa Hari Jai She");
      break;
    case "spampls":
      spampls(message);
      break;
    case "hosaase":
      hosaase(message);
      break;
    case "ropasi":
      ropasi(message);
      break;
    case "hobo?":
      hobo(message);
      break;
    case "kiley?":
      kiley(message);
      break;
    case "saap":
      saap(message, playerQueue);
      break;
    case "sundor":
      sundor(message);
      break;
    case "homai":
      homai(message);
      break;
    case "kikoishe":
      kikoishe(message);
      break;
    case "sloth":
      sloth(message);
      break;
    case "xmas":
      xmas(message);
      break;
    case "newyear":
      newyear(message);
      break;
    case "mutameow":
      mutameow(message);
      break;
    case "dc":
      disconnect(message);
      break;
    case "modot":
      modot(message);
      break;
    case "joke":
      joke(message);
      break;
    case "p":
    case "skip":
    case "stop":
    case "q":
    case "remove":
    case "playlistp":
    case "shuffle":
    case "pause":
    case "resume":
    case "spotify":
    case "allplaylist":
    case "deleteplaylist":
    case "skipto":
      mplay(args, message, command);
      break;
    case "helpmusic":
      helpMusic(message);
      break;
    default:
      message.channel.send(
        "Etu tho Napare De... Modot lage koi le *modot type kuriwi"
      );
  }
});

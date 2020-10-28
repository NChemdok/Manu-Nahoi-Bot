const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const gosol = (message) => {
  var gosolKurishe = ["Gosol Nakura", "Gosol", "Gosol Nakura", "Gosol Nakura"];
  var timePeriodForNai = [
    "Dos Saal",
    "Ek Haafta",
    "Ek Muina",
    "Bishi Din",
    "Teen Din",
    "Hazar Saal",
  ];

  var timePeriodForHoi = ["Jaa Kali Hi", "Aji Hi", "Itiya hi"];
  const user = message.mentions.users.first() || message.author;
  var randomNumber = Math.floor(Math.random() * gosolKurishe.length);
  var gosolStatus = gosolKurishe[randomNumber];
  const color = "#" + generateRandomColor();
  if (gosolStatus === "Gosol") {
    var randomNumber = Math.floor(Math.random() * timePeriodForHoi.length);
    var gosol = timePeriodForHoi[randomNumber];
    var gosolfinal =
      user.username + " tu " + gosol + " " + gosolStatus + " Kurishe";
    const commandResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(gosolfinal);
    message.channel.send(commandResponse);
  } else if (gosolStatus === "Gosol Nakura") {
    var randomNumber = Math.floor(Math.random() * timePeriodForNai.length);
    var gosol = timePeriodForNai[randomNumber];
    var gosolfinal =
      user.username + " tu " + gosolStatus + " " + gosol + " Hoishe";
    const commandResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(gosolfinal);
    message.channel.send(commandResponse);
  } else {
    message.channel.send("```Bot Not Responding```");
  }
};

module.exports = gosol;

const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const xmas = (message) => {
  const memeLinks = [
    "https://static.toiimg.com/photo/72955124.cms",
    "https://gifspro.com/wp-content/uploads/2017/12/GifsPro-id8143204-Christmas-gifs-of-Merry-Christmas.gif",
    "https://media.tenor.com/images/1f8daa4dd32907db9bad305770a93db1/tenor.gif",
    "https://i.pinimg.com/originals/d2/7b/eb/d27bebfd60142d5e01c0b5f0da62bae3.gif",
    "https://www.funimada.com/assets/images/cards/big/christmas-22.gif",
  ];

  const today = new Date();

  const xmas = new Date("December 25, 2021");
  const msPerDay = 24 * 60 * 60 * 1000;
  var currentOffset = today.getTimezoneOffset();

  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(today.getTime() + (ISTOffset + currentOffset) * 60000);
  const timeLeft = xmas.getTime() - ISTTime;

  //document.write("<p>" + timeLeft + "</p>");

  const e_daysLeft = timeLeft / msPerDay;
  const daysLeft = Math.floor(e_daysLeft);
  const e_hrsLeft = (e_daysLeft - daysLeft) * 24;
  const hrsLeft = Math.floor(e_hrsLeft);
  const minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);

  //document.write("There are only<br> <h4>" + daysLeft + " days " + hrsLeft +" hours and " + minsLeft + " minutes left </h4> Until December 25th 2015<P>")

  const daysLeftXmas =
    daysLeft +
    " Days " +
    hrsLeft +
    " Hours and " +
    minsLeft +
    " Minutes left Until Christmas !!!";

  var randomNumber = Math.floor(Math.random() * memeLinks.length);
  const randomLink = memeLinks[randomNumber];
  const color = "#" + generateRandomColor();
  const avatarEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(daysLeftXmas)
    .setImage(randomLink, { size: 2048 });
  message.channel.send(avatarEmbed);
};

module.exports = xmas;

const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const newyear = (message) => {
  const memeLinks = [
    "https://i.pinimg.com/originals/2f/ce/7e/2fce7e6f74605d189eb17a723c872610.gif",
    "https://www.gifs.cc/newyear/2021-happy-new-year-2021-animation.gif",
    "https://www.quoteswishesmsg.com/wp-content/uploads/2019/11/New-Year-images-Gifs.gif",
    "https://i.pinimg.com/originals/3a/1c/d5/3a1cd5aee3410414a1882d0046d7bfbb.gif",
    "https://i.pinimg.com/originals/ff/7e/bd/ff7ebd2a1bacd82b22f3860e19fb79cd.gif",
    "https://i.pinimg.com/originals/29/1a/a8/291aa8ce782a3e00e6629e1ec82e1bc4.gif",
  ];

  const today = new Date();

  const xmas = new Date("January 1, 2021");
  const msPerDay = 24 * 60 * 60 * 1000;
  const timeLeft = xmas.getTime() - today.getTime();

  //document.write("<p>" + timeLeft + "</p>");

  const e_daysLeft = timeLeft / msPerDay;
  const daysLeft = Math.floor(e_daysLeft);
  const e_hrsLeft = (e_daysLeft - daysLeft) * 24;
  const hrsLeft = Math.floor(e_hrsLeft);
  const minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);

  //document.write("There are only<br> <h4>" + daysLeft + " days " + hrsLeft +" hours and " + minsLeft + " minutes left </h4> Until December 25th 2015<P>")

  const daysLeftnewyear =
    daysLeft +
    " Days " +
    hrsLeft +
    " Hours and " +
    minsLeft +
    " Minutes left Until New Year !!!";

  var randomNumber = Math.floor(Math.random() * memeLinks.length);
  const randomLink = memeLinks[randomNumber];
  const color = "#" + generateRandomColor();
  const avatarEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(daysLeftnewyear)
    .setImage(randomLink, { size: 2048 });
  message.channel.send(avatarEmbed);
};

module.exports = newyear;

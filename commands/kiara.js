const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kiara = (message) => {
  const memeLinks = [
    "https://www.meme-arsenal.com/memes/d6b09bce9b152e73a243039d1312189e.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzkQFu__hIvlA7Mj0pARP8M9R8cQx5KxDsYA&usqp=CAU",
    "https://media.tenor.com/images/654fece30064685517c5829245517f14/tenor.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTuT_jnCLD1d_eC2t0OFay61pu_0r6-ESsldA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd0tgF2kUj2kzOe2IgRrGS89u2Y4RF76zERw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8httoJzFNv5KEPWfkQ39i3r5RdO48-EgaEA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJm_sb_fAN5fTTRkfiKVCGN9npAlIEn883hg&usqp=CAU",
    "https://pics.ballmemes.com/ora-ora-ara-ara-imgflip-com-kanna-drake-44867542.png",
    "https://img-comment-fun.9cache.com/media/am06GbX/axNj64pR_700w_0.jpg",
    "https://i.redd.it/yrcl34srdwx21.jpg",
    "https://www.meme-arsenal.com/memes/33bd731ec0db8c872017bfe02c9a9c5a.jpg",
    "https://steamuserimages-a.akamaihd.net/ugc/581323402277862403/313CFEC71409D8D9EF7E7D0C56F50A0DC86A4BEF/",
  ];

  var randomNumber = Math.floor(Math.random() * memeLinks.length);
  const randomLink = memeLinks[randomNumber];
  const color = "#" + generateRandomColor();
  const avatarEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(" Kia-Ara ara ara ")
    .setImage(randomLink, { size: 4096 });
  message.channel.send(avatarEmbed);
};

module.exports = kiara;

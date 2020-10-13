const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kimanderi = (message) => {
  const userArray = message.mentions.users.array();
  const user1 = userArray[0] || message.author;
  const user2 = userArray[1] || "nothing";

  var textArray = [
    "kitya wi Nahubo",
    "Eksou Saal Aram se",
    "Ek Hafta Maximum",
    "First din te jaagra kurikena break up hobo",
    "Tai dui chun la EX pra break up howo diwo",
    "shuru hoa time te nahubo nishina dihkibo, hoilewi piche te sob bhaal hoi jawo",
    "Ek din te break up hobo",
    "match nakure try nakura hi bhal hobo",
    "puila ek bar na hoa nishina aru wi nahubo",
    "momo hotel te jai na first date hoi le, ekso saal jabo",
    "itiya bhal pra najane piche te try kuribi",
    "Kitya wi chara chari nahubo",
  ];

  if (user2 === "nothing") {
    message.channel.send("Naam Duita Dhaliwi");
  } else {
    var randomNumber = Math.floor(Math.random() * textArray.length);
    var randomTime = textArray[randomNumber];
    var kimanderiResponse =
      user1.username + " aru " + user2.username + " tu " + randomTime;
    const color = "#" + generateRandomColor();
    const commandResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(kimanderiResponse);
    message.channel.send(commandResponse);
  }
};

module.exports = kimanderi;

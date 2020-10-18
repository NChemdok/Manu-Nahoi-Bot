const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kikoishe = (message) => {
  const user = message.mentions.users.first() || message.author;

  var linesArray = [
    "Smoked pork tu axone logo te bishi mile",
    "thanda time te raja mircha saathi ase",
    "love te 2nd hand 3rd hand nai, love is blind",
    "kun ke wi bhui nai, ahiwi single fight kuriwo",
    "bhaat nakha agae te haat dulawi",
    "aji pra no modu, hoilewi modur ghor te discount mangi thaka dikshe",
    "moi aji tu joldi gumawo....",
    "oi oi shikar olop dibina, pichete di wapas diwo",
  ];
  var lineSize = Math.floor(Math.random() * linesArray.length);
  var randomLine = linesArray[lineSize];
  var commandResponse = user.username + " koishe, " + randomLine;
  const color = "#" + generateRandomColor();
  const finalResponse = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(commandResponse);
  message.channel.send(finalResponse);
};

module.exports = kikoishe;

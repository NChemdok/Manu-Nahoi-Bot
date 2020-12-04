const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kunase = (message) => {
  const user = message.mentions.users.first() || message.author;

  var relationsArray = [
    "Dada",
    "Bhuni",
    "God Father",
    "Postman",
    "Side Kick",
    "Bodygurad",
    "Partner in Crime",
    "Handkerchief",
    "Ghor Malik",
    "Darling",
    "Momo Partner",
    "Counsellor",
    "Driver",
    "Handyman",
    "Bae",
    "Uncle",
    "Aunty",
    "Coolie",
  ];

  message.guild.members.fetch().then((fetchedMembers) => {
    console.log(fetchedMembers);
    const totalOnline = fetchedMembers.filter(
      (member) => !member.user.bot && member.presence.status === "online"
    );
    // We now have a collection with all online member objects in the totalOnline variable
    var randomNumber = Math.floor(Math.random() * totalOnline.size);
    var relationSize = Math.floor(Math.random() * relationsArray.length);

    var userNames = totalOnline.map((r) => r.user.username);
    var randomUser = user.username;
    while (randomUser === user.username) {
      var randomUser = userNames[randomNumber];
    }
    console.log(randomUser);
    var relationResponse = relationsArray[relationSize];
    var commandResponse =
      user.username +
      " tu " +
      randomUser +
      " laga " +
      relationResponse +
      " ase ";
    const color = "#" + generateRandomColor();
    const finalResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(commandResponse);
    message.channel.send(finalResponse);
  });
};

module.exports = kunase;

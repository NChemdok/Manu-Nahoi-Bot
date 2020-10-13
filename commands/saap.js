const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const saap = (message, playerQueue) => {
  let messageText = message.content.slice(6).trim();

  function lookup(name) {
    for (var i = 0, len = playerQueue.length; i < len; i++) {
      if (playerQueue[i].key === name) return true;
    }
    return false;
  }

  const color = "#" + generateRandomColor();

  const diceValues = [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    -1,
    -3,
    -5,
    -7,
    -9,
    -11,
  ];

  var diceRandom = Math.floor(Math.random() * diceValues.length);

  var diceValue = diceValues[diceRandom];

  if (messageText === "start") {
    message
      .react("👍")
      .then(() =>
        message.channel.send(
          "Game 15 secs te shuru hobo, Ungli ke dabawi Khiliwo koile"
        )
      );

    const filter = (reaction, user) => {
      return (
        ["👍"].includes(reaction.emoji.name) && user.id !== "761892006263390210"
      );
    };

    const collector = message.createReactionCollector(filter, { time: 15000 });

    collector.on("collect", (reaction, user) => {
      playerQueue.push({ key: user.username, value: 0 });
      // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      message.channel.send(
        `${collected.size} Joon Khilibole ase. To start *saap roll`
      );
    });
  } else if (messageText === "roll") {
    const user = message.author;
    if (!lookup(user.username)) {
      message.channel.send(
        "Game start hoishe, Nahoile (*saap start) type kuribi"
      );
    } else if (lookup(user.username)) {
      var currentScore = playerQueue.find((item) => item.key === user.username);
      var objIndex = playerQueue.findIndex((obj) => obj.key === user.username);

      var newScore = +currentScore.value + +diceValue;
      playerQueue[objIndex].value = newScore;
      message.channel.send(user.username + " Rolled " + diceValue);
      const resultResponse = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Saap aru Seedhi")
        .setDescription("Kun 100 First Punchiwo Etu Manu Jitiwo")
        .setThumbnail(
          "https://cdn.shopify.com/s/files/1/0876/1176/files/i984_pimgpsh_fullsize_distr.png?v=1525140332"
        );
      playerQueue.forEach((player) => {
        resultResponse.addField(
          player.key + " Current Position : ",
          player.value
        );
      });
      message.channel.send(resultResponse);

      if (newScore >= 100) {
        const winnerDeclaration = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle("Etu Manu Jitishe")
          .setDescription(user.username + " Won !!! Game has been Reset");
        message.channel.send(winnerDeclaration);
        playerQueue.splice(0, playerQueue.length);
      }
    }
  } else if (messageText === "stop") {
    playerQueue.splice(0, playerQueue.length);
    message.channel.send("Game Reset");
  } else {
    message.channel.send(
      "Wrong Command pls use *saap start (start game), *saap roll (Roll dice) or *saap stop (Stop game)"
    );
  }
};

module.exports = saap;

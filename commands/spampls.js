const spampls = (message) => {
  let messageText = message.content.slice(8).trim();
  var [textToSpam, noOfTimes] = messageText.split(" ");
  const times = parseInt(noOfTimes);
  for (var i = 0; i < times; i++) {
    // message.channel.send(
    //   characters.charAt(Math.floor(Math.random() * charactersLength))
    // );
    message.channel.send(textToSpam);
  }
};

module.exports = spampls;

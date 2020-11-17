const spampls = (message) => {
  let messageText = message.content.slice(8).trim();
  const times = parseInt(messageText);
  console.log(messageText);
  for (var i = times; i >= 0; i--) {
    // message.channel.send(
    //   characters.charAt(Math.floor(Math.random() * charactersLength))
    // );
    message.channel.send("Spam Ends in " + i);
  }
};

module.exports = spampls;

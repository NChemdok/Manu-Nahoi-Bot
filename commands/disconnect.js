const disconnect = async (message) => {
  const user = message.author;
  const userName = user.username;
  let duration = message.content.slice(3);
  if (!duration) {
    return message.channel.send("Need Duration in Minutes Ex : *dc 10");
  }
  const durationValue = parseInt(duration);
  if (!Number.isInteger(durationValue)) {
    return message.channel.send("Duration Needs to be a Number in Minute");
  }

  let userVoiceChannel = await message.member.voice.channel;

  if (!userVoiceChannel) {
    return;
  }

  let disconnectTimer = durationValue * 60000;
  message.channel.send(userName + " Disconnection in " + duration + " Minute");

  setTimeout(function () {
    message.member.voice.kick();
    message.channel.send("You have been disconnected by Manu Nahoi Bot");
  }, disconnectTimer);
};

module.exports = disconnect;

const skip = async (message, serverQueue) => {
  const songToRemove = parseInt(message.content.slice(7).trim(), 10) - 1;
  if (isNaN(songToRemove)) {
    return message.channel.send("Enter Correct Song Number");
  }
  if (!message.member.voice.channel) {
    message.channel.send(
      "You have to be in a voice channel to skip the music!"
    );
  }

  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }

  if (songToRemove === 0) {
    message.channel.send(
      "Cannot Remove Currently Playing Song. Use <Skip> instead"
    );
  } else {
    serverQueue.songs.splice(songToRemove, 1);
    message.channel.send("Removed Song No : " + (songToRemove + 1).toString());
  }
};

module.exports = skip;

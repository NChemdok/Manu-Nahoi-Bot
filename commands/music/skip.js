const skip = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    message.channel.send(
      "You have to be in a voice channel to skip the music!"
    );
  }

  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }
  if (serverQueue.songs.length === 1) {
    message.channel.send("Reached the end of queue :(");
  } else {
    serverQueue.connection.dispatcher.end();
    message.channel.send("Skipped");
  }
};

module.exports = skip;

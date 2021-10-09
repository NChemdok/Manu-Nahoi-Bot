const skip = async (message, serverQueue) => {
  const Channel = message.channel;
  const Messages = await Channel.messages.fetch({ limit: 100 });
  if (!message.member.voice.channel) {
    return message.channel.send(
      "You have to be in a voice channel to skip the music!"
    );
  }

  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }
  if (serverQueue.songs.length === 1) {
    message.channel.send("Reached the end of queue :(");
  } else {
    Messages.forEach((msg) => {
      if (msg.id === serverQueue.currentMusicPlayingMessageId) {
        msg.delete();
      }
    });
    clearTimeout(serverQueue.playbackTimeoutID);
    serverQueue.connection.dispatcher.end();
    return message.channel.send("Skipped").then((msg) => {
      setTimeout(() => msg.delete({ timeout: 4000 }));
    });
  }
};

module.exports = skip;

const stop = async (message, serverQueue) => {
  const Channel = message.channel;
  const Messages = await Channel.messages.fetch({ limit: 100 });

  if (!message.member.voice.channel) {
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  }
  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }

  Messages.forEach((msg) => {
    if (msg.id === serverQueue.currentMusicPlayingMessageId) {
      msg.delete();
    }
  });
  clearTimeout(serverQueue.playbackTimeoutID);
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  serverQueue.songLinks = [];
  return;
};

module.exports = stop;

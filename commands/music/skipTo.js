const skipTo = async (message, serverQueue) => {
  const songNumber = message.content.slice(7).trim();
  const intSongNumber = parseInt(songNumber);
  if (!Number.isInteger(intSongNumber)) {
    return message.channel.send("Song Number Not Correct");
  }
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
    return message.channel.send("Reached the end of queue :(");
  } else {
    Messages.forEach((msg) => {
      if (msg.id === serverQueue.currentMusicPlayingMessageId) {
        msg.delete();
      }
    });
  }
  if (
    intSongNumber > serverQueue.songs.length ||
    serverQueue.songs.length == 1
  ) {
    return message.channel.send("Queue does not have that many songs :(");
  }
  for (var i = 1; i < intSongNumber - 1; i++) {
    serverQueue.songs.shift();
  }
  clearTimeout(serverQueue.playbackTimeoutID);
  serverQueue.connection.dispatcher.end();
  return message.channel.send(`Skipped To Song No : ${songNumber}`);
};

module.exports = skipTo;

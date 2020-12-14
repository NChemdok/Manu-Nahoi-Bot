const stop = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  }
  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  return message.channel.send("Leaving Voice Channel");
};

module.exports = stop;

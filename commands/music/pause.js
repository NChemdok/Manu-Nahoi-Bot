const pause = async (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
      "You have to be in a voice channel to skip the music!"
    );
  }
  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }
  serverQueue.connection.dispatcher.pause();
  return message.channel.send("Playback Paused (T_T)").then((msg) => {
    setTimeout(() => msg.delete({ timeout: 4000 }));
  });
};

module.exports = pause;

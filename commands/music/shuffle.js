const shuffle = async (message, serverQueue, queue) => {
  function shufflePlaylist(playlist) {
    if (playlist.length < 2) {
      return playlist;
    }

    for (let i = playlist.length - 2; i > 1; --i) {
      const j = 1 + Math.floor(Math.random() * i);
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }

    return playlist;
  }

  if (!message.member.voice.channel) {
    message.channel.send(
      "You have to be in a voice channel to shuffle the playlist!"
    );
  }

  if (!serverQueue) {
    return message.channel.send("Bot not playing currently");
  }
  if (serverQueue.songs.length === 1) {
    message.channel.send("Shuffle Not Possible, Single item in playlist");
  } else {
    shufflePlaylist(serverQueue.songs);
    message.channel.send("Shuffled !!!");
  }
};

module.exports = shuffle;

const player = require("./player");

const play = async (args, message, serverQueue, queue) => {
  const songSearchEntered = message.content.slice(2).trim();
  if (!songSearchEntered) {
    return message.channel
      .send("Please Provide Song Link/ Song Name")
      .then((msg) => {
        setTimeout(() => msg.delete({ timeout: 4000 }));
      });
  }

  const voiceChannel = message.member.voice.channel;

  async function play(guild) {
    await player(guild, message, queue);
  }

  async function ifBotNotPlaying() {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      currentMusicPlayingMessageId: null,
      playbackTimeoutID: null,
      songLinks: [],
    };

    queue.set(message.guild.id, queueConstruct);

    try {
      var connection = await voiceChannel.join();
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel
        .send("Something Went Wrong. Please Try again")
        .then((msg) => {
          setTimeout(() => msg.delete({ timeout: 4000 }));
        });
    }
    queueConstruct.connection = connection;
    return queueConstruct;
  }

  async function ifBotPlaying(serverQueue, songlinks) {
    serverQueue.songLinks = songlinks;
    for (songs in serverQueue.songLinks) {
      serverQueue.songs.push(serverQueue.songLinks[songs]);
    }
    if (serverQueue && serverQueue.songs.length == 1) {
      try {
        await play(message.guild);
      } catch (error) {
        console.log(error);
      }
    }
    message.channel
      .send(`${songlinks} has been added to queue!`)
      .then((msg) => {
        setTimeout(() => msg.delete({ timeout: 5000 }));
      });
    serverQueue.songLinks = [];
  }

  async function addSongsToTheQueue(songSearchEntered) {
    const songlinks = [songSearchEntered];
    message.channel.send("Queuing Song").then((msg) => {
      setTimeout(() => msg.delete({ timeout: 6000 }));
    });
    if (!serverQueue) {
      serverQueue = await ifBotNotPlaying();
    }
    ifBotPlaying(serverQueue, songlinks);
  }

  if (!voiceChannel) {
    return message.channel
      .send("You need to be in a voice channel")
      .then((msg) => {
        setTimeout(() => msg.delete({ timeout: 4000 }));
      });
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel
      .send("I need permissions to join and speak in the voice channel")
      .then((msg) => {
        setTimeout(() => msg.delete({ timeout: 4000 }));
      });
  }

  addSongsToTheQueue(songSearchEntered);
};

module.exports = play;

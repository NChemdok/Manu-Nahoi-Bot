const ytdl = require("ytdl-core");
const yts = require("yt-search");
const player = require("./player");

const play = async (args, message, serverQueue, queue) => {
  const songSearchEntered = message.content.slice(2).trim();
  if (!songSearchEntered) {
    return message.channel.send("Please Provide Song Link/ Song Name");
  }

  const voiceChannel = message.member.voice.channel;

  async function getTheSongDetails(songInfo) {
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      duration: songInfo.videoDetails.lengthSeconds,
    };
  }

  async function play(guild, song) {
    await player(guild, song, message, queue);
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
      return message.channel.send("Something Went Wrong. Please Try again");
    }
    queueConstruct.connection = connection;
    return queueConstruct;

    // for (songs in queueConstruct.songLinks) {
    //   if (ytdl.validateURL(queueConstruct.songLinks[songs])) {
    //     const songInfo = await ytdl.getInfo(queueConstruct.songLinks[songs]);
    //     getTheSongDetails(songInfo);
    //     queueConstruct.songs.push(song);
    //     queueConstruct.songLinks.shift();
    //   } else {
    //     const { videos } = await yts(queueConstruct.songLinks[songs]);
    //     if (!videos.length) return message.channel.send("No songs were found!");
    //     const songInfo = await ytdl.getInfo(videos[0].url);
    //     getTheSongDetails(songInfo);
    //     queueConstruct.songs.push(song);
    //     queueConstruct.songLinks.shift();
    //   }

    //   try {
    //     var connection = await voiceChannel.join();
    //     queueConstruct.connection = connection;
    //     play(message.guild, queueConstruct.songs[0]);
    //   } catch (err) {
    //     console.log(err);
    //     return message.channel.send("Something Went Wrong. Please Try again");
    //   }
    // }
    // queueConstruct.songLinks = [];
    // return message.channel.send(`${song.title} has been added to queue!`);
  }

  async function ifBotPlaying(serverQueue, songlinks) {
    serverQueue.songLinks = songlinks;
    for (songs in serverQueue.songLinks) {
      console.log(serverQueue.songLinks[songs]);
      if (ytdl.validateURL(serverQueue.songLinks[songs])) {
        const songInfo = await ytdl.getInfo(serverQueue.songLinks[songs]);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      } else {
        const { videos } = await yts(serverQueue.songLinks[songs]);
        if (!videos.length) return message.channel.send("No songs were found!");
        const songInfo = await ytdl.getInfo(videos[0].url);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
        if (serverQueue && serverQueue.songs.length == 1) {
          play(message.guild, serverQueue.songs[0]);
        }
      }
      serverQueue.songLinks.shift();
    }
    if (serverQueue) {
      return message.channel.send(`${song.title} has been added to queue!`);
    }
  }

  async function addSongsToTheQueue(songSearchEntered) {
    const songlinks = [songSearchEntered];
    message.channel.send("Queuing Song");
    if (!serverQueue) {
      serverQueue = await ifBotNotPlaying();
    }
    ifBotPlaying(serverQueue, songlinks);
  }

  if (!voiceChannel) {
    return message.channel.send("You need to be in a voice channel");
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need permissions to join and speak in the voice channel"
    );
  }

  addSongsToTheQueue(songSearchEntered);
};

module.exports = play;

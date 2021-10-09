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
  }

  async function ifBotPlaying(serverQueue, songlinks) {
    serverQueue.songLinks = songlinks;
    for (songs in serverQueue.songLinks) {
      if (ytdl.validateURL(serverQueue.songLinks[songs])) {
        const songInfo = await ytdl.getInfo(serverQueue.songLinks[songs]);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      } else {
        const { videos } = await yts(serverQueue.songLinks[songs]);
        if (!videos.length) return message.channel.send("No songs were found!");
        try {
          const songInfo = await ytdl.getInfo(videos[0].url);
          getTheSongDetails(songInfo);
          await serverQueue.songs.push(song);
        } catch (error) {
          return message.channel.send(
            "Song is Age Restricted/Copyrighted Unable to queue, Try a different song !"
          );
        }
        if (serverQueue && serverQueue.songs.length == 1) {
          await play(message.guild, serverQueue.songs[0]);
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

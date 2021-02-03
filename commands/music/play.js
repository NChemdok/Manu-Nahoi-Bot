const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const play = async (args, message, serverQueue, queue) => {
  const songSearchEntered = message.content.slice(2).trim();
  if (!songSearchEntered) {
    return message.channel.send("Please Provide Song Link/ Song Name");
  }

  const voiceChannel = message.member.voice.channel;

  const Messages = await message.channel.messages.fetch({ limit: 100 });

  async function getTheSongDetails(songInfo) {
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      duration: songInfo.videoDetails.lengthSeconds,
    };
  }

  async function play(guild, song) {
    const serverQueue = queue.get(message.guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      message.channel.send("No more Songs in Queue, Leaving Voice Channel");
      return;
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url));
    dispatcher
      .on("finish", function () {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", (error) => {
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    function secondsToTime(songDurationInSeconds) {
      var hr = Math.floor(songDurationInSeconds / 3600)
          .toString()
          .padStart(2, "0"),
        min = Math.floor((songDurationInSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0"),
        sec = Math.floor(songDurationInSeconds % 60)
          .toString()
          .padStart(2, "0");

      if (Math.floor(songDurationInSeconds / 3600) < 1) {
        return min + " min : " + sec + " sec";
      } else {
        return hr + " hr : " + min + " min : " + sec + " sec";
      }
    }

    const color = "#" + generateRandomColor();
    const resultResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`Now playing : 🎧`)
      .setThumbnail("https://s8.gifyu.com/images/logoc770e3d062e8bb72.gif")
      .addFields({ name: song.title, value: secondsToTime(song.duration) });
    const messageId = await serverQueue.textChannel.send(resultResponse);
    serverQueue.currentMusicPlayingMessageId = messageId.id;
    try {
      messageId.delete({ timeout: song.duration * 1000 });
    } catch {}
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

  // if (!ytdl.validateURL(songLink)) {
  //   return message.channel.send("Invalid Link | No Song Found");
  // }
  // const song = {
  //   title: songInfo.videoDetails.title,
  //   url: songInfo.videoDetails.video_url,
  //   duration: songInfo.videoDetails.lengthSeconds,
  // };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      currentMusicPlayingMessageId: null,
      playing: true,
    };

    queue.set(message.guild.id, queueConstruct);
    if (ytdl.validateURL(songSearchEntered)) {
      const songInfo = await ytdl.getInfo(songSearchEntered);
      getTheSongDetails(songInfo);
      queueConstruct.songs.push(song);
    } else {
      console.log(songSearchEntered);
      const { videos } = await yts(songSearchEntered);
      if (!videos.length) return message.channel.send("No songs were found!");
      const songInfo = await ytdl.getInfo(videos[0].url);
      getTheSongDetails(songInfo);
      queueConstruct.songs.push(song);
    }

    // const songInfo = await ytdl.getBasicInfo(song.url);
    // console.log(songInfo.videoDetails.video_url);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    if (ytdl.validateURL(songSearchEntered)) {
      const songInfo = await ytdl.getInfo(songSearchEntered);
      getTheSongDetails(songInfo);
      serverQueue.songs.push(song);
    } else {
      console.log(songSearchEntered);
      const { videos } = await yts(songSearchEntered);
      if (!videos.length) return message.channel.send("No songs were found!");
      const songInfo = await ytdl.getInfo(videos[0].url);
      getTheSongDetails(songInfo);
      serverQueue.songs.push(song);
    }

    return message.channel.send(`${song.title} has been added to queue!`);
  }
};

module.exports = play;

const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const player = async (guild, message, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if (serverQueue.songs.length == 0) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return message.channel
      .send("No more Songs in Queue, Leaving Voice Channel")
      .then((msg) => {
        setTimeout(() => msg.delete({ timeout: 4000 }));
      });
  }
  if (!serverQueue) {
    return;
  }

  async function getTheSongDetails(songInfo) {
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      duration: songInfo.videoDetails.lengthSeconds,
    };
    return song;
  }

  async function getSongUrl(songs) {
    if (ytdl.validateURL(songs)) {
      try {
        const songInfo = await ytdl.getInfo(songs);
        const song = getTheSongDetails(songInfo);
        return song;
      } catch (error) {
        console.log(error);
      }
    } else {
      const { videos } = await yts(songs);
      if (!videos.length) {
        return;
      }
      try {
        const songInfo = await ytdl.getInfo(videos[0].url);
        const song = getTheSongDetails(songInfo);
        return song;
      } catch (error) {
        console.log(error);
        message.channel.send(
          `${songs} is Age Restricted/Copyrighted Unable to queue`
        );
      }
    }
  }

  const currentSong = await getSongUrl(serverQueue.songs[0]);
  const dispatcher = serverQueue.connection.play(
    ytdl(currentSong.url, {
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    })
  );
  message.channel
    .send(`${currentSong.title} has been added to queue!`)
    .then((msg) => {
      setTimeout(() => msg.delete({ timeout: 5000 }));
    });
  dispatcher
    .on("finish", function () {
      serverQueue.songs.shift();
      player(guild, message, queue);
    })
    .on("error", (error) => {
      console.error(error);
    });

  serverQueue.connection.on("disconnect", () => {
    clearTimeout(serverQueue.playbackTimeoutID);
    serverQueue.songs = [];
    queue.delete(guild.id);
    return;
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
    .addFields({
      name: currentSong.title,
      value: secondsToTime(currentSong.duration),
    });

  try {
    var messageId = await serverQueue.textChannel.send(resultResponse);
    serverQueue.currentMusicPlayingMessageId = messageId.id;
    serverQueue.playbackTimeoutID = setTimeout(
      () => messageId.delete(),
      currentSong.duration * 1000
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = player;

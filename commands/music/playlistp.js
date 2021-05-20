const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");
const firebase = require("firebase-admin");
var serviceAccount = require("../../serviceKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://manunahoidiscordbot-d7ad2.firebaseio.com",
});

const playlistp = async (message, serverQueue, queue) => {
  const playlistName = message.content
    .slice(10)
    .trim()
    .toUpperCase()
    .toString();

  var db = firebase.firestore();
  console.log(playlistName);

  var online = [];

  const songRef = db
    .collection("user")
    .doc("DiscordID")
    .collection("playlist")
    .doc(playlistName);
  const doc = await songRef.get("songs");
  if (!doc.exists) {
    message.channel.send("Playlist Doesn't Exist !!!");
  } else {
    doc.get("songs").forEach(function (doc) {
      online.push(doc.toString());
    });
    message.channel.send("Queuing Songs...");
  }

  var songlinks = online;

  const voiceChannel = message.member.voice.channel;

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

    const dispatcher = serverQueue.connection.play(
      ytdl(song.url, {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      })
    );
    dispatcher
      .on("finish", function () {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
        serverQueue.lastCommandUsed = "Not Skipped";
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
    serverQueue.playbackTimeoutID = setTimeout(
      () => messageId.delete(),
      song.duration * 1000
    );
  }

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      currentMusicPlayingMessageId: null,
      playbackTimeoutID: null,
      playing: true,
    };

    queue.set(message.guild.id, queueConstruct);
    for (songs in songlinks) {
      if (ytdl.validateURL(songlinks[songs])) {
        const songInfo = await ytdl.getInfo(songlinks[songs]);
        getTheSongDetails(songInfo);
        queueConstruct.songs.push(song);
      } else {
        const { videos } = await yts(songlinks[songs]);
        if (!videos.length) {
          continue;
        }
        const songInfo = await ytdl.getInfo(videos[0].url);
        getTheSongDetails(songInfo);
        queueConstruct.songs.push(song);
        if (queueConstruct.songs.length <= 1) {
          try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        }
      }
    }
  } else {
    for (songs in songlinks) {
      if (ytdl.validateURL(songlinks[songs])) {
        const songInfo = await ytdl.getInfo(songlinks[songs]);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      } else {
        const { videos } = await yts(songlinks[songs]);
        if (!videos.length) {
          continue;
        }
        const songInfo = await ytdl.getInfo(videos[0].url);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      }
    }
  }

  if (songlinks.length !== 0) {
    return message.channel.send(
      `${songlinks.length} Songs from ${playlistName} playlist has been added to queue!`
    );
  }
};

module.exports = playlistp;

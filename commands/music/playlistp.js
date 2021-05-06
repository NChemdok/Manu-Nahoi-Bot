const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const playlistp = async (message, serverQueue, queue) => {
  const playlistName = message.content.slice(10).trim();

  const maroon5 = [
    "beautiful mistakes maroon 5",
    "maps Maroon 5",
    "memories maroon 5",
    "payphone maroon 5",
    "daylight maroon 5",
  ];

  const anime = [
    "gurenge lisa",
    "the town where the stars fall fukka",
    "for you",
    "sunshine nurarihyon",
  ];

  const korean = [
    "running start up kdrama",
    "start itaewon class",
    "life goes on bts",
    "LOVE SCENARIO ikon",
  ];

  const sanam = [
    "chala ja ta hoon sanam",
    "ehsan tera hoga sanam",
    "pal pal dil ki pass tum rheti ho sanam",
    "tere aankhon se sanam",
    "hai apna dil sanam",
    "gulabi aankhen sanam",
    "tarif karoon sanam",
    "lag ja gale sanam",
  ];

  const nightcore = [
    "im on my way nightcore",
    "sacred love kilzer",
    "pandemonium nightcore",
  ];

  const mix = [
    "take me back to when we were kids bangers",
    "its okay if you forget me astrid",
    "we can be kings again",
    "at my worst",
    "can you come thru jermy",
  ];

  message.channel.send("Queuing Songs...");
  if (playlistName.toLowerCase() === "maroon 5") {
    var songlinks = maroon5;
  } else if (playlistName.toLowerCase() === "anime") {
    var songlinks = anime;
  } else if (playlistName.toLowerCase() === "korean") {
    var songlinks = korean;
  } else if (playlistName.toLowerCase() === "sanam") {
    var songlinks = sanam;
  } else if (playlistName.toLowerCase() === "nightcore") {
    var songlinks = nightcore;
  } else if (playlistName.toLowerCase() === "mix") {
    var songlinks = mix;
  } else {
    message.channel.send("Playlist Not Found !!!");
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
    for (songs in songlinks) {
      if (ytdl.validateURL(songlinks[songs])) {
        const songInfo = await ytdl.getInfo(songlinks[songs]);
        getTheSongDetails(songInfo);
        queueConstruct.songs.push(song);
      } else {
        const { videos } = await yts(songlinks[songs]);
        if (!videos.length) return message.channel.send("No songs were found!");
        const songInfo = await ytdl.getInfo(videos[0].url);
        getTheSongDetails(songInfo);
        queueConstruct.songs.push(song);
      }
    }
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
    for (songs in songlinks) {
      if (ytdl.validateURL(songlinks[songs])) {
        const songInfo = await ytdl.getInfo(songlinks[songs]);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      } else {
        const { videos } = await yts(songlinks[songs]);
        if (!videos.length) return message.channel.send("No songs were found!");
        const songInfo = await ytdl.getInfo(videos[0].url);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      }
    }
  }

  if (songlinks) {
    return message.channel.send(
      `${songlinks.length} Songs from ${playlistName} playlist has been added to queue!`
    );
  }
};

module.exports = playlistp;

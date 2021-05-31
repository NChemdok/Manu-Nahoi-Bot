const ytdl = require("ytdl-core");
const yts = require("yt-search");
const player = require("./player");
const firebase = require("firebase-admin");
const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } =
  process.env;

firebase.initializeApp({
  credential: firebase.credential.cert({
    project_id: FIREBASE_PROJECT_ID,
    private_key:
      FIREBASE_PRIVATE_KEY[0] === "-"
        ? FIREBASE_PRIVATE_KEY
        : JSON.parse(FIREBASE_PRIVATE_KEY),
    client_email: FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://manunahoidiscordbot-d7ad2.firebaseio.com",
});

const playlistp = async (message, serverQueue, queue) => {
  const voiceChannel = message.member.voice.channel;

  const playlistName = message.content
    .slice(10)
    .trim()
    .toUpperCase()
    .toString();

  async function getTheSongDetails(songInfo) {
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      duration: songInfo.videoDetails.lengthSeconds,
    };
  }

  async function play(guild, song) {
    player(guild, song, message, queue);
    return;
  }

  async function fetchDataFromFirestore(playlistName) {
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
      return;
    } else {
      doc.get("songs").forEach(function (doc) {
        online.push(doc.toString());
      });
      return online;
    }
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
    // while (queueConstruct.songLinks.length >= 1) {
    //   const currentSong = queueConstruct.songLinks.shift();
    //   if (ytdl.validateURL(currentSong)) {
    //     const songInfo = await ytdl.getInfo(currentSong);
    //     getTheSongDetails(songInfo);
    //     queueConstruct.songs.push(song);
    //   } else {
    //     const { videos } = await yts(currentSong);
    //     if (!videos.length) {
    //       continue;
    //     }
    //     const songInfo = await ytdl.getInfo(videos[0].url);
    //     getTheSongDetails(songInfo);
    //     queueConstruct.songs.push(song);
    //     if (queueConstruct.songs.length == 1) {
    //       try {
    //         var connection = await voiceChannel.join();
    //         queueConstruct.connection = connection;
    //         play(message.guild, queueConstruct.songs[0]);
    //       } catch (err) {
    //         console.log(err);
    //         return message.channel.send(
    //           "Something Went Wrong. Please Try again"
    //         );
    //       }
    //     }
    //   }
    // if (queueConstruct) {
    //   return message.channel.send(
    //     `${queueConstruct.songs.length} Songs from ${playlistName} playlist has been added to queue!`
    //   );
    // }
  }

  async function ifBotPlaying(serverQueue, songlinks) {
    serverQueue.songLinks = songlinks;
    for (song in serverQueue.songLinks) {
      if (serverQueue.songLinks === null) {
        return message.channel.send("Queuing Terminated");
      }
      if (ytdl.validateURL(serverQueue.songLinks[song])) {
        const songInfo = await ytdl.getInfo(serverQueue.songLinks[song]);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
      } else {
        const { videos } = await yts(serverQueue.songLinks[song]);
        if (!videos.length) {
          continue;
        }
        const songInfo = await ytdl.getInfo(videos[0].url);
        getTheSongDetails(songInfo);
        serverQueue.songs.push(song);
        if (serverQueue && serverQueue.songs.length == 1) {
          play(message.guild, serverQueue.songs[0]);
        }
      }
    }
    if (serverQueue) {
      return message.channel.send(
        `${serverQueue.songs.length} Songs from ${playlistName} playlist has been added to queue!`
      );
    }
  }

  async function addSongsToTheQueue(songlinks) {
    message.channel.send("Queuing Songs...");
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

  if (serverQueue && serverQueue.songLinks.length >= 1) {
    return message.channel.send(
      "Bot Currently Queuing Please Try again after previous command is complete!"
    );
  }
  try {
    var songlinks = await fetchDataFromFirestore(playlistName);
  } catch (err) {
    console.log(err);
  }
  if (!Array.isArray(songlinks)) {
    return message.channel.send("Playlist Doesn't Exist !!!");
  }
  addSongsToTheQueue(songlinks);
};

module.exports = playlistp;

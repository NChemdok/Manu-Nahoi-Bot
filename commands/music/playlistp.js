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
  const userName = message.mentions.users.first() || message.author;
  const discordUserID = userName.id.toString().trim();

  const playlistName = message.content.slice(3).trim().toUpperCase().toString();
  // console.log(playlistName);

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

    var online = [];

    const songRef = db
      .collection("user")
      .doc(discordUserID)
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
  }

  async function ifBotPlaying(serverQueue, songlinks) {
    serverQueue.songLinks = songlinks;
    for (song in serverQueue.songLinks) {
      if (serverQueue.songLinks.length == 0 || serverQueue.botVoiceState == 1) {
        serverQueue.songs = [];
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
        try {
          const songInfo = await ytdl.getInfo(videos[0].url);
          getTheSongDetails(songInfo);
          await serverQueue.songs.push(song);
          if (serverQueue && serverQueue.songs.length == 1) {
            await play(message.guild, serverQueue.songs[0]);
          }
        } catch (error) {
          message.channel.send(
            `${song.title} is Age Restricted/Copyrighted Unable to queue, Try a different song !`
          );
          continue;
        }
      }
    }
    if (serverQueue) {
      message.channel.send(
        `${serverQueue.songLinks.length} Songs from ${playlistName} playlist has been added to queue!`
      );
      return (serverQueue.songLinks = []);
    }
  }

  async function addSongsToTheQueue(songlinks) {
    message.channel
      .send("Queuing Songs...")
      .then(async (msg) => {
        if (!serverQueue) {
          serverQueue = await ifBotNotPlaying();
        }
        ifBotPlaying(serverQueue, songlinks);
        setTimeout(() => msg.delete({ timeout: 5000 * songlinks.length }));
      })
      .catch(() => {
        console.log("Error In AddSongsToQueueFUNC");
      });
    return;
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

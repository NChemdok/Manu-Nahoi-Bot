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

  async function play(guild) {
    player(guild, message, queue);
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
    for (songs in serverQueue.songLinks) {
      serverQueue.songs.push(serverQueue.songLinks[songs]);
      if (serverQueue && serverQueue.songs.length == 1) {
        await play(message.guild);
      }
    }

    if (serverQueue) {
      message.channel.send(
        `${serverQueue.songLinks.length} Songs from ${playlistName} playlist has been added to queue!`
      );
    }
    serverQueue.songLinks = [];
  }

  async function addSongsToTheQueue(songlinks) {
    message.channel
      .send("Queuing Songs...")
      .then(async (msg) => {
        if (!serverQueue) {
          serverQueue = await ifBotNotPlaying();
        }
        ifBotPlaying(serverQueue, songlinks);
        setTimeout(() => msg.delete({ timeout: 100 * songlinks.length }));
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

  try {
    var songlinks = await fetchDataFromFirestore(playlistName);
  } catch (err) {
    console.log(err);
  }
  if (!Array.isArray(songlinks)) {
    return message.channel.send("Playlist Doesn't Exist !!!").then((msg) => {
      setTimeout(() => msg.delete({ timeout: 4000 }));
    });
  }
  addSongsToTheQueue(songlinks);
};

module.exports = playlistp;

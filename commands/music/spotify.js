const { getData, getPreview, getTracks } = require("spotify-url-info");

const firebase = require("firebase-admin");

const spotify = async (message, serverQueue) => {
  const songInfoFromUser = message.content.slice(8).trim();
  const userName = message.author;
  const discordUserID = userName.id.toString().trim();

  const playlistName = songInfoFromUser
    .substring(0, songInfoFromUser.lastIndexOf(" "))
    .toUpperCase()
    .trim();
  const playlistLink = songInfoFromUser.substring(
    songInfoFromUser.lastIndexOf(" ") + 1
  );

  if (!playlistName || !playlistLink) {
    return message.channel
      .send("No Playlist Name Or Playlist Link Entered")
      .then((msg) => {
        setTimeout(() => msg.delete({ timeout: 4000 }));
      });
  }
  var songsObject = { songs: [] };

  var db = firebase.firestore();
  const songRef = db
    .collection("user")
    .doc(discordUserID)
    .collection("playlist")
    .doc(playlistName);

  try {
    var songs = await getTracks(playlistLink);
  } catch {
    console.error();
    return message.channel.send("Invalid Spotify Link !!!").then((msg) => {
      setTimeout(() => msg.delete({ timeout: 3000 }));
    });
  }

  message.channel
    .send(
      `Adding Songs to ${playlistName} Playlist, This may take a while based on the number of songs in playlist`
    )
    .then((msg) => {
      setTimeout(() => msg.delete({ timeout: 1000 * 20 }));
    });
  for (items in songs) {
    const songID = "https://open.spotify.com/track/" + songs[items].id;
    try {
      var songDetails = await getPreview(songID);
      var songToAddInArray = `${songDetails.title} ${songDetails.artist}`;
      var formatedSongData = songToAddInArray.trim().toString();
      songsObject.songs.push(formatedSongData);
    } catch (error) {
      console.log(error);
      continue;
    }

    // console.log(`${songDetails.title} ${songDetails.artist}`);
  }
  //console.log(songsObject);
  try {
    await songRef.set(songsObject);
    return message.channel.send("Successfully Added");
  } catch {
    return message.channel.send("Something wrong :( Songs not added");
  }
};
module.exports = spotify;

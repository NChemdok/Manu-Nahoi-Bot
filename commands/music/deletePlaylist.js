const firebase = require("firebase-admin");

const deletePlaylist = async (message) => {
  const playlistName = message.content.slice(15).trim();
  console.log(playlistName);
};

module.exports = deletePlaylist;

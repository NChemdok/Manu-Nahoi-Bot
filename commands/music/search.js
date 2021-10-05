const yts = require("yt-search");
const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const generateRandomColor = require("../../extras/generateRandomColor");

const Search = async (message) => {
  const searchKeyword = message.content.slice(2).trim();
  var searchResults = "";

  async function getTheSongDetails(songInfo) {
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      duration: songInfo.videoDetails.lengthSeconds,
    };
  }

  async function getLoopCount(searchResultsCount) {
    if (searchResultsCount < 15) {
      return (loopCount = searchResultsCount);
    } else return (loopCount = 15);
  }

  if (ytdl.validateURL(searchKeyword)) {
    const songInfo = await ytdl.getInfo(searchKeyword);
    console.log(songInfo);
    getTheSongDetails(songInfo);
    return message.channel.send(song.title);
  } else {
    const { videos } = await yts(searchKeyword);
    if (!videos.length) {
      return message.channel.send("No Result found !");
    }
    console.log(videos.length);
    const loopCount = await getLoopCount(videos.length);
    for (var i = 0; i < loopCount; i++) {
      console.log(i);
      const songInfo = await ytdl.getInfo(videos[i].url);
      getTheSongDetails(songInfo);
      var songTitle = song.title;
      var searchResultsColored =
        "[" + i + '] "' + songTitle.substring(0, 30) + "...  | ";
      ('"');
      searchResults = searchResults + searchResultsColored + "\n";
    }

    const color = "#" + generateRandomColor();
    const finalResponse = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`Search Results for ${searchKeyword}`)
      .setDescription("```css\n" + searchResults + "\n```");
    return message.channel.send(finalResponse);
  }
};

module.exports = Search;

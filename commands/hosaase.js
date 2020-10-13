const generateRandomColor = require("../extras/generateRandomColor");

const hosaase = (message) => {
  const user = message.mentions.users.first() || message.author;
  const memeLinks = [
    "https://iili.io/2r9472.jpg",
    "https://iili.io/2r9Pm7.md.jpg",
    "https://iili.io/2r9rdl.jpg",
    "https://iili.io/2r9Ug4.jpg",
    "https://iili.io/2r96eS.jpg",
    "https://iili.io/2r9sI9.jpg",
    "https://iili.io/2r9LXe.jpg",
    "https://iili.io/2r9QLu.jpg",
    "https://iili.io/2r9tqb.jpg",
    "https://iili.io/2r9D1j.jpg",
  ];

  var randomNumber = Math.floor(Math.random() * memeLinks.length);
  const randomLink = memeLinks[randomNumber];
  const color = "#" + generateRandomColor();
  message.delete({ timeout: 0 });
  message.channel.send({
    embed: {
      color: color,
      description: user.username + " Approves ",
      image: { url: randomLink },
    },
  });
};

module.exports = hosaase;

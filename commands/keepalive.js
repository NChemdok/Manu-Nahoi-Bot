const keepalive = async (message) => {
  const user = message.author;

  const messageText = "Zinda Ase, Itiya Wi";

  if (user.username === "Slowthy_Sloth") {
    while (true) {
      await message.channel.send(messageText, { timeout: 200000 });
    }
  } else {
    message.channel.send("You are not allowed to use this command");
  }
};

module.exports = keepalive;

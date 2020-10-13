const keepalive = async (message) => {
  const user = message.author;

  const messageText = "Zinda Ase, Itiya Wi";

  function Sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  if (user.username === "Slowthy_Sloth") {
    while (true) {
      message.channel.send(messageText);
      await Sleep(200000);
    }
  } else {
    await message.channel.send("You are not allowed to use this command");
  }
};

module.exports = keepalive;

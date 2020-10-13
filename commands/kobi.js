const kobi = (message) => {
  let messageText = message.content.slice(6);
  if (messageText !== " ") {
    message.delete({ timeout: 0 });

    message.channel.send(messageText, { timeout: 200 });
  }
};

module.exports = kobi;

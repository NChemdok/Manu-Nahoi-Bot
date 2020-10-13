const spampls = (message) => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 40; i++) {
    // message.channel.send(
    //   characters.charAt(Math.floor(Math.random() * charactersLength))
    // );
    message.channel.send("Moving On ...");
  }
};

module.exports = spampls;

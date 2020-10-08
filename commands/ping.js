const ping = (message) => {
  const timeTaken = Date.now() - message.createdTimestamp;

  message.channel.send(
    `Zinda Ase De !!! ${timeTaken}ms Eman Time Loi Reply Kar Ni`
  );
};

module.exports = ping;

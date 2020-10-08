const kimanmanu = (message) => {
  message.guild.members.fetch().then((fetchedMembers) => {
    const totalOnline = fetchedMembers.filter(
      (member) => !member.user.bot && member.presence.status === "online"
    );
    // We now have a collection with all online member objects in the totalOnline variable
    message.channel.send(
      `Yate ${totalOnline.size} Members Itiya Tak Zinda Ase`
    );
  });
};

module.exports = kimanmanu;

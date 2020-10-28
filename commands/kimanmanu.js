const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const kimanmanu = (message) => {
  message.channel.send("Aji kali Etu kaam nakure, picke te try kuribi nu ");
  // message.guild.members.fetch().then((fetchedMembers) => {
  //   const totalOnlineStatus = fetchedMembers.filter(
  //     (member) => !member.user.bot && member.presence.status === "online"
  //   );

  //   const totalIdleStatus = fetchedMembers.filter(
  //     (member) => !member.user.bot && member.presence.status === "idle"
  //   );

  //   const totalDoNotDisturbStatus = fetchedMembers.filter(
  //     (member) => !member.user.bot && member.presence.status === "dnd"
  //   );
  //   const totalOnline = fetchedMembers.filter(
  //     (member) => !member.user.bot && member.presence.status !== "offline"
  //   );
  //   // We now have a collection with all online member objects in the totalOnline variable
  //   const color = "#" + generateRandomColor();
  //   const resultResponse = new Discord.MessageEmbed()
  //     .setColor(color)
  //     .setTitle("Eman Manu Yate Ase")
  //     .setThumbnail("https://i.ibb.co/nQh9t25/images.png")
  //     .addFields(
  //       {
  //         name: "Online Status Chula Khan",
  //         value: totalOnlineStatus.size,
  //       },
  //       { name: "Idle Status Chula Khan", value: totalIdleStatus.size },
  //       {
  //         name: "DND Status Chula Khan",
  //         value: totalDoNotDisturbStatus.size,
  //       },
  //       { name: "Sob Members Milai Kena", value: totalOnline.size }
  //     );
  //   message.channel.send(resultResponse);
  // });
};

module.exports = kimanmanu;

const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const sloth = (message) => {
  const memeLinks = [
    "https://i.pinimg.com/600x315/29/99/0c/29990c6dcad06388fc137f0c298d979b.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSABNDWvZKuG0WsWtwwkHqAPAutep9J-iL5pA&usqp=CAU",
    "https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/831/2019/07/12184620/hurricane-barry-sloth-meme.png",
    "https://i.ytimg.com/vi/LVGX1b8OmcI/maxresdefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT_OgyCIjZF3j0PapTCrhpPzUJXabYpj105gw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4q5ing6pO5H7vuKR8BjJhwtgBf86jojGp5A&usqp=CAU",
    "https://i.ytimg.com/vi/SY9scAM1sS8/hqdefault.jpg",
    "https://www.memesmonkey.com/images/memesmonkey/b8/b8dd25c13eb06dc9138edd063fe62402.jpeg",
    "https://media.tenor.com/images/909189a9af196e52133133fd4369e124/tenor.gif",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS01xEmES9-ASZp5mldI7MMgLra_xZSZ4LCow&usqp=CAU",
    "https://ih1.redbubble.net/image.381492462.4745/sn,x1000-pad,750x1000,f8f8f8.u1.jpg",
    "https://i.pinimg.com/736x/fd/55/26/fd5526f556f445a4f54afe2e2ce7fe26.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmWqav8cLMdDduVjPSxlIcamLgAh84L7drrA&usqp=CAU",
    "https://ih1.redbubble.net/image.494724767.7309/fmp,x_small,gloss,wall_texture,product,750x1000.u3.jpg",
    "https://i.pinimg.com/originals/8d/9b/da/8d9bdabef8b5636c00695740ba67710b.jpg",
    "https://pics.awwmemes.com/thumb_sloth-astronaut-wallpaper-wallpapersafari-50277774.png",
    "https://media.tenor.com/images/1d08de4d5ecc52d5439f355a63850310/tenor.gif",
    "https://media1.giphy.com/media/obQn088BeLUKQ/source.gif",
    "https://media.tenor.com/images/384fcf514c02f9e84a7183f534e07157/tenor.gif",
    "https://64.media.tumblr.com/51bff5865f407377c33bac1c18a98775/tumblr_mlikm4Sxxg1s6h1wgo1_500.gif",
    "https://media.tenor.com/images/a75c6f0c6c9219273af57b8cac1d4192/tenor.gif",
    "https://i1.wp.com/ilovememphisblog.com/wp-content/uploads/2017/05/giphy-29.gif",
    "https://www.pbh2.com/wordpress/wp-content/uploads/2017/01/sleeping-sloth-gifs.gif",
    "https://66.media.tumblr.com/164b23d1ca29a9f442faa98ac3b47a8f/tumblr_o74f15vvTJ1sp8ng5o1_500.gif",
    "https://i.pinimg.com/originals/b3/8c/37/b38c37ead28dc699a26ce058aee6af70.gif",
    "https://thumbs.gfycat.com/AdmiredDrearyEstuarinecrocodile-small.gif",
  ];

  var randomNumber = Math.floor(Math.random() * memeLinks.length);
  const randomLink = memeLinks[randomNumber];
  const color = "#" + generateRandomColor();
  const avatarEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Here's a Sloth !!! ")
    .setImage(randomLink, { size: 4096 });
  message.channel.send(avatarEmbed);
};

module.exports = sloth;

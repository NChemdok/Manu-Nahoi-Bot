const kiley = (message) => {
  const replyText = [
    "Moi ke nahudiwi",
    "Tui la Kuta ke hudiwi",
    "kiley koile Tuila Matha Dangoor, boobs hoile ekta khota",
    "kiley koile Tui oversmart ase",
    "apuni la shakal aina te sawi",
    "kiley koile Tui la pokor kala",
    "Tui la boobs dangoor ase",
    "Tui Andrew nishina sexy nahoi",
    "kiley koile Tui la boobs bishi chutu ase",
    "Tui la naukar nahoi moi",
    "Thuii !!! Etu wi najane? Kaam nai",
    "kiley koile Tui la theeng gundai",
    "kiley koile Tui la armpit ghundai",
    "kiley koile Tui la chest te chuli bishi ulai",
    "Bacha khan nabuji wo",
    "kiley koile Poisa pra morom dangoor",
  ];
  var randomNumber = Math.floor(Math.random() * replyText.length);
  var randomReply = replyText[randomNumber];
  message.channel.send(randomReply);
};

module.exports = kiley;

const keepAlive = async () => {
  setInterval(function () {
    console.log("Is Alive");
  }, 120000);
};

module.exports = keepAlive;

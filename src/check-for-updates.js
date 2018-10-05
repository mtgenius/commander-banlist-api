const banlists = require('./banlists');
const fetch = require('./fetch');

const banlistsLength = banlists.length;

const checkForUpdates = () => {
  console.log('Checking for updates on ' + new Date().toUTCString());

  for (let x = 0; x < banlistsLength; x++) {
    fetch(banlists[x].url)
      .then(response => {
        console.log('Received ' + banlists[x].short + '.');
        return response.text();
      })
      .then(banlists[x].match)
      .then(cards => {
        banlists[x].cards = cards;
      })
      .catch(err => {
        console.error(err);
      });
  }
};

module.exports = checkForUpdates;

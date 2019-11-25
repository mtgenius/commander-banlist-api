const banlists = require('../constants/banlists');
const fetch = require('./fetch');
const putLogEvent = require('./put-log-event');

const checkForUpdates = () => {
  putLogEvent(process.env.INFO_LOG_STREAM_NAME, {
    method: 'UPDATE',
  });

  for (const banlist of banlists) {
    fetch(banlist.url)
      .then(response => {
        putLogEvent(banlist.logStreamName, {
          method: 'FETCH',
          banlist: banlist.short,
          status: 'success',
        });
        return response.text();
      })
      .then(banlist.match)
      .then(cards => {
        banlist.cards = cards;
      })
      .catch(err => {
        putLogEvent(banlist.logStreamName, {
          method: 'FETCH',
          banlist: banlist.short,
          status: 'error',
          error: err.message,
        });
      });
  }
};

module.exports = checkForUpdates;

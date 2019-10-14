const http = require('http');
const banlists = require('./banlists');
const checkForUpdates = require('./check-for-updates');

const DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN = 'https://mtgeni.us';
const ACCESS_CONTROL_ALLOW_ORIGINS = [
  DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN,
  'https://mtgenius.github.io',
];

const TWELVE_HOURS_S = 60 * 60 * 12;
const TWELVE_HOURS_MS = TWELVE_HOURS_S * 1000;

// Check for set updates every 12 hours.
setInterval(checkForUpdates, TWELVE_HOURS_MS);
checkForUpdates();

// Start the server.
http.createServer((req, response) => {
  response.writeHead(200, {
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin':
      ACCESS_CONTROL_ALLOW_ORIGINS.indexOf(req.headers.origin) !== -1
        ? req.headers.origin
        : DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN,
    'Cache-Control': 'max-age=' + TWELVE_HOURS_S + ', public',
    'Content-Type': 'application/json; charset=utf-8',
    'Expires': new Date(Date.now() + TWELVE_HOURS_MS).toUTCString()
  });
  response.write(JSON.stringify(
    banlists.map(({ cards, long, short }) => ({ cards, long, short }))
  ));
  response.end();
})
  .listen(8081, () => {
    console.log('Listening on port 8081.');
  });

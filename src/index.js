const http = require('http');
const banlists = require('./constants/banlists');
const checkForUpdates = require('./utils/check-for-updates');
const putLogEvent = require('./utils/put-log-event');

if (!process.env.ACCESS_CONTROL_ALLOW_ORIGIN) {
  putLogEvent(process.env.INFO_LOG_STREAM_NAME, {
    method: 'LISTEN',
    status: 'error',
    error: 'ACCESS_CONTROL_ALLOW_ORIGIN must be defined.',
  });
  process.exit(1);
}

const ACCESS_CONTROL_ALLOW_ORIGINS = process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(
  ' ',
);

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const TWELVE_HOURS_IN_SECONDS = 12 * SECONDS_PER_HOUR;
const TWELVE_HOURS_IN_MILLISECONDS =
  12 * SECONDS_PER_HOUR * MILLISECONDS_PER_SECOND;

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8081;

// Check for set updates every 12 hours.
setInterval(checkForUpdates, TWELVE_HOURS_IN_MILLISECONDS);
checkForUpdates();

// Start the server.
http
  .createServer((req, response) => {
    try {
      const Expires = new Date(
        Date.now() + TWELVE_HOURS_IN_MILLISECONDS,
      ).toUTCString();

      response.writeHead(200, {
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin':
          ACCESS_CONTROL_ALLOW_ORIGINS.indexOf(req.headers.origin) !== -1
            ? req.headers.origin
            : ACCESS_CONTROL_ALLOW_ORIGINS[0],
        'Cache-Control': 'max-age=' + TWELVE_HOURS_IN_SECONDS + ', public',
        'Content-Type': 'application/json; charset=utf-8',
        Expires,
      });

      response.write(
        JSON.stringify(
          // Strip the cards log stream name and url properties.
          banlists.map(({ cards, long, short }) => ({ cards, long, short })),
        ),
      );
    } catch (err) {
      putLogEvent(process.env.INFO_LOG_STREAM_NAME, {
        method: 'REQUEST',
        status: 'error',
        error: err.message,
      });
    }

    response.end();
  })
  .listen(PORT, () => {
    putLogEvent(process.env.INFO_LOG_STREAM_NAME, {
      method: 'LISTEN',
      status: 'success',
      port: PORT,
    });
  });

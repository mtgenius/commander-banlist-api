const cloudWatchLogs = require('./cloudwatch-logs');

const awaitingSince = new Map();
const nextSequenceTokens = new Map();
const sequenceTokenRetries = new Map();

const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND;
const THIRTY_MINUTES_IN_MILLISECONDS = 30 * MILLISECONDS_PER_MINUTE;

module.exports = function putLogEvent(
  logStreamName,
  logEvent,
  timestamp = Date.now(),
) {
  if (!cloudWatchLogs || !process.env.LOG_GROUP_NAME || !logStreamName) {
    console.log(logEvent);
    return;
  }

  // If a previous request has been hanging for over 30 minutes, drop it.
  if (awaitingSince.has(logStreamName)) {
    if (
      awaitingSince.get(logStreamName) >
      Date.now() - THIRTY_MINUTES_IN_MILLISECONDS
    ) {
      setTimeout(() => {
        putLogEvent(logStreamName, logEvent, timestamp);
      }, 100);
      return;
    }
    console.error(logStreamName, 'Dropping hanging PutLogEvents request.');
    awaitingSince.delete(logStreamName);
  }

  // If nextSequenceToken has been invalid 3 times in a row, we are no longer
  //   accurately grabbing the nextSequenceToken. Bail out of retrying.
  if (
    sequenceTokenRetries.has(logStreamName) &&
    sequenceTokenRetries.get(logStreamName) >= 3
  ) {
    sequenceTokenRetries.delete(logStreamName);
    return;
  }

  console.log(logStreamName, logEvent);
  cloudWatchLogs.putLogEvents(
    {
      logEvents: [
        {
          message:
            typeof logEvent === 'object' ? JSON.stringify(logEvent) : logEvent,
          timestamp: timestamp.toString(),
        },
      ],
      logGroupName: process.env.LOG_GROUP_NAME,
      logStreamName,
      sequenceToken: nextSequenceTokens.get(logStreamName),
    },

    (err, data) => {
      if (awaitingSince.has(logStreamName)) {
        awaitingSince.delete(logStreamName);
      }

      if (err) {
        // If the cached sequence token is out of sync with the real sequence
        //   token, update the cached sequence token.
        if (
          err.code === 'DataAlreadyAcceptedException' ||
          err.code === 'InvalidSequenceTokenException'
        ) {
          sequenceTokenRetries.set(
            logStreamName,
            sequenceTokenRetries.has(logStreamName)
              ? sequenceTokenRetries.get(logStreamName) + 1
              : 1,
          );
          const nextSequenceToken = err.message.match(/\d+$/)[0];
          console.log(logStreamName, err.code, err.message);
          nextSequenceTokens.set(logStreamName, nextSequenceToken);
          putLogEvent(logStreamName, logEvent, timestamp);
          return;
        }
        if (sequenceTokenRetries.has(logStreamName)) {
          sequenceTokenRetries.delete(logStreamName);
        }

        // Log all other errors to the console.
        console.error(logStreamName, err);
        return;
      }

      if (sequenceTokenRetries.has(logStreamName)) {
        sequenceTokenRetries.delete(logStreamName);
      }
      nextSequenceTokens.set(logStreamName, data.nextSequenceToken);
      console.log(logStreamName, data);
    },
  );
};

const CloudWatchLogs = require('aws-sdk/clients/cloudwatchlogs');

module.exports =
  process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? new CloudWatchLogs({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION || 'us-east-1',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      })
    : null;

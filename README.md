# Commander Banlist API

An API for querying the _Magic: the Gathering_ banlists for the various
Commander formats, also known as Elder Dragon Highlander (EDH).

## Usage

The Commander banlist API is powered by Node within a Docker container and can
optionally write to CloudWatch Logs. You can pull the Docker image and run the
container via the following commands:

```
docker pull mtgenius/commander-banlist-api;

docker run \
  --detach \
  --env ACCESS_CONTROL_ALLOW_ORIGIN=* \
  --env AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXX \
  --env AWS_REGION=us-east-1 \
  --env AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --env BRAWL_LOG_STREAM_NAME=brawl \
  --env DUEL_LOG_STREAM_NAME=duel \
  --env INFO_LOG_STREAM_NAME=info \
  --env LOG_GROUP_NAME=mtgenius/commander-banlist-api \
  --env MTGO_1V1_LOG_STREAM_NAME=mtgo-1v1 \
  --env PORT=8081 \
  --env WOTC_LOG_STREAM_NAME=wotc \
  --name commander-banlist-api \
  --restart always \
  mtgenius/commander-banlist-api;
```

## Environment variables

- `ACCESS_CONTROL_ALLOW_ORIGIN`: a _required_ space-delimited list of domain
  names that may request access to this API. Use `*` to whitelist all domains.
- `AWS_ACCESS_KEY`/`AWS_SECRET_ACCESS_KEY`: the AWS access keys required to
  optionally make the AWS API calls for logging.
- `AWS_REGION`: an optional string that denotes the AWS region to which the logs
  should be sent.
- `LOG_GROUP_NAME`: an optional value that denotes the CloudWatch Logs log group
  name to which logs will be written.
- `INFO_LOG_STREAM_NAME`: an optional value that denotes the CloudWatch Logs log
  stream name to which information logs will be written in the aforementioned
  log group. For example, an information log would include the server starting.
- `*_LOG_STREAM_NAME`: optional values that denote the CloudWatch Logs log
  stream name to which logs will be written in the aforementioned log group.
- `PORT`: an optional number that denotes the port on which the server will run.

## Sponsor 💗

If you are a fan of this project, you may
[become a sponsor](https://github.com/sponsors/CharlesStover)
via GitHub's Sponsors Program.

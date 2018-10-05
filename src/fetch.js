const HttpsProxyAgent = require('https-proxy-agent');
const nodeFetch = require('node-fetch');

const fetch = (url, o = Object.create(null)) => {
  const options = {...o};
  if (
    process.env.HTTP_PROXY &&
    !options.agent
  ) {
    options.agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
  }
  return nodeFetch(url, options);
};

module.exports = fetch;

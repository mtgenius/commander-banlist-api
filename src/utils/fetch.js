const HttpProxyAgent = require('http-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');
const nodeFetch = require('node-fetch');

const fetch = (url, o = Object.create(null)) => {
  const options = {...o};
  if (
    process.env.HTTP_PROXY &&
    !options.agent
  ) {
    options.agent =
      /^https/.test(url) ?
        new HttpsProxyAgent(process.env.HTTPS_PROXY) :
        new HttpProxyAgent(process.env.HTTP_PROXY);
  }
  return nodeFetch(url, options);
};

module.exports = fetch;

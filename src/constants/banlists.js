const matchBrawl = require('../matches/brawl');
// const matchCommander = require('./matches/commander');
const matchDuel = require('../matches/duel');
const matchMtgo = require('../matches/mtgo');
const matchWotc = require('../matches/wotc');

module.exports = [
  /*
  // The MTG Commander banlist is synonymous with the Wizards of the Coast
  //   banlist, except it is missing dexterity cards.
  {
    long: 'MTG Commander',
    short: 'Multiplayer',
    url: 'http://mtgcommander.net/rules.php',
    match: matchCommander,
    cards: []
  },
  */
  {
    long: 'Wizards of the Coast',
    short: 'Multiplayer',
    url: 'https://magic.wizards.com/en/content/commander-format',
    match: matchWotc,
    logStreamName: process.env.WOTC_LOG_STREAM_NAME,
    cards: [],
  },
  {
    long: 'Brawl',
    short: 'Brawl',
    url: 'https://magic.wizards.com/en/game-info/gameplay/formats/brawl',
    match: matchBrawl,
    logStreamName: process.env.BRAWL_LOG_STREAM_NAME,
    cards: [],
  },
  {
    long: 'Magic the Gathering Online, 30 Life',
    short: 'MTGO 1v1',
    url:
      'https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted/magic-online-commander',
    match: matchMtgo,
    logStreamName: process.env.MTGO_1V1_LOG_STREAM_NAME,
    cards: [],
  },
  {
    long: 'Duel Commander, 20 Life',
    short: 'Duel 1v1',
    url: 'http://www.duelcommander.com/banlist/',
    match: matchDuel,
    logStreamName: process.env.DUEL_LOG_STREAM_NAME,
    cards: [],
  },
];

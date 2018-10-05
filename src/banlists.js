const matchCommander = require('./matches/commander');
const matchDuel = require('./matches/duel');
const matchMtgo = require('./matches/mtgo');
const matchWotc = require('./matches/wotc');

module.exports = [
  {
    long: 'MTG Commander',
    short: 'Multiplayer',
    url: 'http://mtgcommander.net/rules.php',
    match: matchCommander,
    cards: []
  },
  {
    long: 'Wizards of the Coast',
    short: 'WotC',
    url: 'https://magic.wizards.com/en/content/commander-format',
    match: matchWotc,
    cards: []
  },
  {
    long: 'Magic the Gathering Online, 30 Life',
    short: 'MTGO 1v1',
    url: 'https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted/magic-online-commander',
    match: matchMtgo,
    cards: []
  },
  {
    long: 'Duel Commander, 20 Life',
    short: 'Duel 1v1',
    url: 'http://www.duelcommander.com/banlist/',
    match: matchDuel,
    cards: []
  }
];

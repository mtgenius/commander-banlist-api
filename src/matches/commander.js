const stripMarkup = card => card.match(/">(.+?)<\/a>$/)[1];

const matchCommander = html => {

  // Get card list.
  const table = html.match(/<font size="?\+1"?>Banlist<\/font>[\s\S]+?<table width="?100%"?>([\s\S]+?)<\/table>/i);
  if (table === null) {
    throw new Error('Could not find card list for Multiplayer!');
  }

  // Card cards from list.
  const cards = table[1].match(/<li><a .*?href="http:\/\/deckbox\.org\/mtg\/.+?">.+?<\/a>/g);
  if (cards === null) {
    throw new Error('Could not find cards for Multiplayer!');
  }

  // Strip HTML.
  return cards[1].map(stripMarkup);
};

module.exports = matchCommander;

const stripMarkup = card => card.match(/">(.+?)<\/a>$/)[1];

const matchCommander = html => {

  // Get card list.
  const table = html.match(/<font size="?\+1"?>Banlist<\/font>[\s\S]+?<table width="?100%"?>([\s\S]+?)<\/table>/i);
  if (table === null) {
    throw new Error('Could not find card list for Multiplayer!');
  }

  // Card cards from list.
  let cards = table[1].match(/<li><a .*?href="http:\/\/deckbox\.org\/mtg\/.+?">.+?<\/a>/g);
  if (cards === null) {
    throw new Error('Could not find cards for Multiplayer!');
  }

  // Strip HTML.
  cards = cards.map(stripMarkup);

  // Fix Moxen.
  const moxen = cards.findIndex(card => card === 'Mox Sapphire, Ruby, Pearl, Emerald and Jet');
  if (moxen !== -1) {
    cards.splice(moxen, 1);
    cards = cards.concat([ 'Mox Emerald', 'Mox Jet', 'Mox Pearl', 'Mox Ruby', 'Mox Sapphire' ]);
  }

  return cards;
};

module.exports = matchCommander;

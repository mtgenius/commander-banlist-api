const missingCards = ['Chaos Orb', 'Falling Star', 'Shahrazad'];

const stripMarkup = card => card.match(/>(.+?)<$/)[1];

const matchMtgo = html => {
  // Get cards.
  const cards = html.match(
    /<a href="http:\/\/gatherer\.wizards\.com\/Pages\/Card\/Details\.aspx\?name=.+?".*?>(.+?)</g,
  );
  if (cards === null) {
    throw new Error('Could not find cards for MTGO!');
  }

  // Add cards not in MTGO or missing from the banlist.
  return cards.map(stripMarkup).concat(missingCards);
};

module.exports = matchMtgo;

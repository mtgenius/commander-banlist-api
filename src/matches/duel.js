const fixTypo = card => card.replace(/Divning/, 'Divining');

const stripMarkup = card => fixTypo(card.match(/>(.+?)<$/)[1]);

const matchDuel = html => {

  // Get cards.
  const cards = html.match(/<a href="http:\/\/gatherer\.wizards\.com\/Pages\/Card\/Details\.aspx\?multiverseid=\d+".*?>.+?</g);
  if (cards === null) {
    throw new Error('Could not find cards for Duel Commander!');
  }

  // Strip HTML.
  return cards.map(stripMarkup);
};

module.exports = matchDuel;

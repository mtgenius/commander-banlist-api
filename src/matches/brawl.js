const stripMarkup = card =>
  card.match(/>([^<]+?)(?:<\/a>)?<\/li>$/)[1].replace(/&amp;/, '&');

const matchWotc = html => {
  // Get card list.
  const list = html.match(/<div id="bnr-brawl".+?<\/div>/is);
  if (list === null) {
    throw new Error('Could not find card list for Brawl!');
  }

  // Get cards from list.
  const cards = list[0].match(
    /<li>(?:<a href=".+?" class="autocard-link" data-image-url=".+?">)?[^<]+?(?:<\/a>)?<\/li>/gi,
  );
  if (cards === null) {
    throw new Error('Could not find cards for Brawl!');
  }

  // Strip HTML.
  return cards.map(stripMarkup);
};

module.exports = matchWotc;

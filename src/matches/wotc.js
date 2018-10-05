const stripMarkup = card => card.match(/>([^<]+?)(?:<\/a>)?<\/li>$/)[1].replace(/&amp;/, '&');

const matchWotc = html => {

  // Get card list.
  const list = html.match(/<ul class="list\-links">[\s\S]+?<\/ul><p>/i);
  if (list === null) {
    throw new Error('Could not find card list for WotC!');
  }

  // Get cards from list.
  const cards = list[0].match(/<li>(?:<a href=".+?" class="autocard-link" data-image-url=".+?">)?[^<]+?(?:<\/a>)?<\/li>/gi);
  if (cards === null) {
    throw new Error('Could not find cards for WotC!');
  }

  // Strip HTML.
  return cards.map(stripMarkup);
};

module.exports = matchWotc;

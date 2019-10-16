const BANNED_CARD_REGEXP = /\<li class=\"_2cuy _509q _2vxa\">(?:\<span class=\"_4yxr\"\>)?(.+?)(?:\<\/span\>)?\<\/li\>/;

const BANNED_COMMANDER_REGEXP = /\<li class=\"_2cuy _509q _2vxa\"\>(?:\<span class=\"_4yxr\"\>)?(.+?)(?:\<\/span\>)? is (?:now )?banned ?\<span class=\"_4yxo\"\> ?as as? commander only\.? ?\<\/span\>\.?\<\/li\>/;

const BANNED_CARD_REGEXP_G = new RegExp(BANNED_CARD_REGEXP, 'g');
const BANNED_COMMANDER_REGEXP_G = new RegExp(BANNED_COMMANDER_REGEXP, 'g');

const matchDuel = html => {
  const sanitizedHtml = html.replace(/&#8217;/g, "'").replace(/’/g, "'");

  const banned = ['Chaos Orb', 'Falling Star', 'Shahrazad'];

  const matches = sanitizedHtml.match(
    /\<ul class=\"_5a_q _5yj1\" dir=\"ltr\"\>(.+?)\<\/ul>/gis,
  );
  if (matches === null || matches.length !== 4) {
    throw new Error('Could not find cards for Duel Commander!');
  }
  matches.shift(); // info
  matches.shift(); // dexterity cards

  const [bannedCommanders, bannedCards] = matches;

  for (const bannedCommander of bannedCommanders.match(
    BANNED_COMMANDER_REGEXP_G,
  )) {
    const [, card] = bannedCommander.match(BANNED_COMMANDER_REGEXP);
    banned.push(card);
  }

  for (const bannedCard of bannedCards.match(BANNED_CARD_REGEXP_G)) {
    const [, card] = bannedCard.match(BANNED_CARD_REGEXP);
    if (banned.indexOf(card) === -1) {
      banned.push(card);
    }
  }

  return banned;
};

module.exports = matchDuel;

var axios = require('axios');
var cheerio = require('cheerio');

function getPlayerHeroRank(battletag, hero_name) {
  var HERO_MAP = {
    'bastion': 15,
    'mei': 20,
  }
  var heroId = HERO_MAP[hero_name.toLowerCase()];
  var url = 'http://masteroverwatch.com/profile/pc/us/'+battletag.replace('#', '-')+'/heroes/'+heroId;
  return axios.get(url)
  .then(function (response) {
    var $ = cheerio.load(response.data);
    return $('.hero-rank:first-child strong').text();
  })
}

module.exports = {
  getPlayerHeroRank: getPlayerHeroRank
}

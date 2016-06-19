var axios = require('axios');
var cheerio = require('cheerio');

function getPlayerHeroRank(battletag, hero_name) {
  var HERO_MAP = {
    'roadhog': 1,
    'junkrat': 2,
    'lucio': 3,
    'soldier': 4,
    'soldier:76': 4,
    '76': 4,
    'zarya': 5,
    'mccree': 6,
    'tracer': 7,
    'reaper': 8,
    'widow': 9,
    'widowmaker': 9,
    'winston': 10,
    'pharah': 11,
    'reinhardt': 12,
    'symmetra': 13,
    'torbjorn': 14,
    'bastion': 15,
    'hanzo': 16,
    'mercy': 17,
    'zenyatta': 18,
    //why skip 19?
    'mei': 20,
    'genji': 21,
    'd.va': 22,
    'dva': 22,
    
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

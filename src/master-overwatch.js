var axios = require('axios');
var cheerio = require('cheerio');

function getPlayerHeroRank(name, hero) {
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
    'mei': 20,
    'genji': 21,
    'd.va': 22,
    'dva': 22,
  }
  var heroId = HERO_MAP[hero.toLowerCase()];
  var url = 'http://masteroverwatch.com/leaderboards/pc/us/hero/'+heroId+'/role/overall/score/search?name='+name;
  return axios.get(url).then(function (response) {
    var status = response.data.status;
    if (status === 'error') {
      var message = response.data.message;
      throw new Error(message);
    } else if (status === 'success') {
      var entries = response.data.entries;
      // entries is a list of html strings
      // containing players and some stats
      return entries.map(function(html) {
        var $ = cheerio.load(html);
        return {
          name: $('.table-icon strong span').text().trim(),
          rank: $('.table-icon-rank').text()
        }
      });
    } else {
      throw new Error('Unhandled status: '+status);
    }
  })
}

module.exports = {
  getPlayerHeroRank: getPlayerHeroRank
}

if (!module.parent) {
  getPlayerHeroRank('foo', 'dva').then(function(rank) {
    console.log(rank);
  }).catch(function(err) {
    console.log('caught err', err.message);
  });
}

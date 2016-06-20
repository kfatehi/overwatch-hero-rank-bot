var MO = require('./master-overwatch');
var fs = require('fs');

module.exports = function(content, cb) {
  var parts = content.split(/\s/);
  if (parts[0] === '!rank') {
    if (parts.length === 2) {
      var battleTag = parts[1];
      MO.getPlayerRank(battleTag).then(function(players) {
        if (players.length === 0) {
          cb(null, battleTag+' is not ranked');
        } else {
          var str = '';
          players.forEach(function(player) {
            str+=player.name+' is '+player.rank+' overall: '+player.url+'\n'
          });
          cb(null, str.trim());
        }
      }).catch(cb);
    } else if (parts.length === 3) {
      var hero = parts[1];
      var battleTag = parts[2]
      MO.getPlayerHeroRank(battleTag, hero).then(function(players) {
        if (players.length === 0) {
          cb(null, battleTag+' is not a ranked '+hero);
        } else {
          var str = '';
          players.forEach(function(player) {
            str+=player.name+' is '+player.rank+' '+hero+': '+player.url+'\n'
          });
          cb(null, str.trim());
        }
      }).catch(cb);
    } else {
      cb(null, fs.readFileSync(__dirname+'/../README.md').toString())
    }
  }
}

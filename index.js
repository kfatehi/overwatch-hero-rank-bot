var Discord = require("discord.js");
var AuthDetails = require("./auth.json");
var MasterOverwatch =  require('./src/master-overwatch');
var getPlayerHeroRank = MasterOverwatch.getPlayerHeroRank;

function handleMessage(message) {
  var parts = message.content.split(/\s/);
  if (parts[0] === '!rank') {
    if (parts.length === 3) {
      var hero = parts[1];
      var battleTag = parts[2]
      getPlayerHeroRank(battleTag, hero).then(function(players) {
        if (player.length === 0) {
          bot.reply(message, player.name+' is not a ranked '+hero);
        } else {
          var str = '';
          players.forEach(function(player) {
            str+=player.name+' is '+player.rank+' '+hero+'\n'
          });
          bot.reply(message, str);
        }
      }).catch(function (error) {
        bot.reply(message, error.message);
      });
    } else {
      bot.reply(message, "FORMAT: !rank <hero> <battletag>")
    }
  }

  if (parts[0] === '!herobot rename') {
    var name = parts.slice(2, parts.length);

    console.log(name);
  }
};

var bot = new Discord.Client();

bot.on("ready", function() {
	console.log('Ready to begin! Serving in '+bot.channels.length+' channels');
  // http://discordjs.readthedocs.io/en/latest/docs_client.html#updatedetails-details-callback
  bot.updateDetails({
    username: "Hero Bot"
  }, function(err) {
    if (err) throw err;
  });
});

bot.on("message", handleMessage)

bot.on("disconnected", function() {
	console.log("Disconnected!");
	process.exit(1);
});

bot.loginWithToken(AuthDetails.token);

// https://discordapp.com/oauth2/authorize?client_id=193879111452721152&scope=bot&permissions=19456

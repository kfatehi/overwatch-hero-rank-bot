var Discord = require("discord.js");
var AuthDetails = require("./auth.json");
var processInput = require('./src/process-input');

var bot = new Discord.Client();

bot.on("ready", function() {
	console.log('Ready to begin! Serving in '+bot.channels.length+' channels');
  // http://discordjs.readthedocs.io/en/latest/docs_client.html#updatedetails-details-callback
  //bot.updateDetails({
  //  username: "Hero Bot"
  //}, function(err) {
  //  if (err) throw err;
  //});
});

bot.on("message", function(message) {
  processInput(message.content, function(err, resp) {
    if (err)
      bot.reply(message, err.stack);
    else
      bot.reply(message, resp);
  })
})

bot.on("disconnected", function() {
	console.log("Disconnected!");
	process.exit(1);
});

bot.loginWithToken(AuthDetails.token);

// https://discordapp.com/oauth2/authorize?client_id=193879111452721152&scope=bot&permissions=19456

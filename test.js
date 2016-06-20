#!/usr/bin/env node
//use it to test

var processInput = require('./src/process-input');
var args = process.argv.slice(2, process.argv.length);
args[0] = '!'+args[0];
var input = args.join(' ');
console.log('test message: '+input);

processInput(input, function(err, resp) {
  if (err)
    console.log(err.stack);
  else
    console.log(resp);
});

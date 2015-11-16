#!/usr/bin/env node

var util = require ('./util.js');
var ws   = require('ws');


/**
* sub gets list of files for a given container
*
* @param {String} argv[2] url
* @callback {bin~cb} callback
*/
function sub(argv, callback) {
  var uri = argv[2];
  var wss = 'wss://' + uri.split('/')[2] + '/';

  var s = new ws(wss, {
    origin: 'http://websocket.org'
  });

  s.on('open', function open() {
    console.log('connected');
    s.send('sub ' + uri);
  });

  s.on('close', function close() {
    console.log('disconnected');
  });

  s.on('message', function message(data, flags) {
    console.log(data);
  });
}


/**
* sub as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  sub(argv, function(err, res) {
    console.log(res);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = sub;

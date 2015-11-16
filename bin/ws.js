#!/usr/bin/env node

var util = require ('./util.js');
var wss  = require('ws');
var INTERVAL = 60 * 1000;


/**
* ws runs a websocket against a URI
*
* @param {String} argv[2] url
* @callback {bin~cb} callback
*/
function ws(argv, callback) {
  if (!argv[2]) {
    console.error("url is required");
    console.error("Usage : ws <url>");
    process.exit(-1);
  }
  var uri = argv[2];
  var updatesVia = 'wss://' + uri.split('/')[2] + '/';

  var s = new wss(updatesVia, {
    origin: 'http://websocket.org'
  });

  s.on('open', function open() {
    var sub = 'sub ' + uri;
    callback(null, sub);
    s.send(sub);
    setInterval(function() {
      var message = 'ping';
      callback(null, message);
      s.send(message);
    }, INTERVAL);
  });

  s.on('close', function close() {
    callback(null, 'disconnected');
  });

  s.on('message', function message(data, flags) {
    callback(null, data);
  });
}


/**
* ws as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  ws(argv, function(err, res) {
    if (err) {
      console.err(err);
    } else {
      console.log(res);
    }
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = ws;

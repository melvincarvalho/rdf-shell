#!/usr/bin/env node

var util = require ('./util.js');
var wss  = require('ws');
var debug = require('debug')('rdf-shell');

// Sockets sometimes times out silently after 5 minutes
var INTERVAL  = 240 * 1000;
var RECONNECT = 10 * 1000;


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

  var s;

  var connect = function(){
    s = new wss(updatesVia, {
      origin: 'http://websocket.org'
    });

    s.on('error', function() {
      callback('socket error');
      setTimeout(connect, RECONNECT);
    });

    s.on('open', function open() {
      var sub = 'sub ' + uri;
      callback(null, sub);
      s.send(sub);

      // periodically ping server
      setInterval(function() {
        var message = 'ping';
        debug(null, message);
        s.send(message);
      }, INTERVAL);
    });

  };
  connect();

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

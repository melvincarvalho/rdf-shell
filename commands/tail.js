var util = require ('./util.js');
var ws   = require('ws');


/**
* tail gets list of files for a given container
*
* @param {String} argv[2] url
* @callback {bin~cb} callback
*/
function tail(argv, callback) {
  if (!argv[2]) {
    console.error("url is required");
    console.error("Usage : cat <url>");
    process.exit(-1);
  }
  var uri = argv[2];
  var wss = 'wss://' + uri.split('/')[2] + '/';

  var s = new ws(wss, {
    origin: 'http://websocket.org'
  });

  s.on('open', function open() {
    s.send('sub ' + uri);
  });

  s.on('close', function close() {
    console.log('disconnected');
  });

  s.on('message', function message(data, flags) {
    var a = data.split(' ');
    if (a.length && a[0] === 'pub') {
      util.get(a[1], function(err, res) {
        if (err) {
          console.error('Error : ' + err);
        } else {
          console.log(res);
        }
      });
    }
  });
}


/**
* tail as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  tail(argv, function(err, res) {
    console.log(res);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = tail;

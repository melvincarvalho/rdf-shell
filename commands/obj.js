var util = require ('./util.js');
var ws   = require('ws');


/**
* obj gets list of files for a given container
*
* @param {String} argv[2] url
* @callback {bin~cb} callback
*/
function obj(argv, callback) {
  var uri = argv[2];

  if (argv[3]) {
    util.put(argv[2], '<> <> """' + argv[3] + '""" .', function(err, callback){
      if (err) {
        console.error(err);
      } else {
        console.log('put value : ' + argv[3]);
      }
    });
  } else {
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
        util.getAll(a[1], function(err, res) {
          if (err) {
            callback(err);
          } else {
            callback(null, res[res.length-1].object.value);
          }
        });
      }
    });
  }
}


/**
* obj as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  obj(argv, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);      
    }
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = obj;

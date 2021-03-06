#!/usr/bin/env node


var util = require ('./util.js');


/**
* rm gets list of files for a given container
*
* @param {String} argv[2] url
* @param {String} argv[3] data
* @callback {bin~cb} callback
*/
function rm(uri, callback) {
  util.rm(uri, function(err, val) {
    if (!err) {
      callback(null, val, uri)
    }
  })
}


/**
* rm as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  rm(argv, function(err, res, uri) {
    console.log('rm of : ' + uri);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = rm;

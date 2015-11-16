#!/usr/bin/env node

var util = require ('./util.js');



/**
* put gets list of files for a given container
*
* @param {String} argv[2] url
* @param {String} argv[3] data
* @callback {bin~cb} callback
*/
function put(argv, callback) {
  if (!argv[2]) {
    console.error("url is required");
    console.error("Usage : put <url> <data>");
    process.exit(-1);
  }
  if (!argv[3]) {
    console.error("data is required");
    console.error("Usage : put <url> <data>");
    process.exit(-1);
  }
  util.put(argv[2], argv[3], function(err, val) {
    if (!err) {
      console.log('PUT to : ' + argv[2]);
    }
  });
}


/**
* put as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  id(argv, function(err, res) {
    console.log(res);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = put;

var util = require ('./util.js');


/**
* rm gets list of files for a given container
*
* @param {String} argv[2] url
* @param {String} argv[3] data
* @callback {bin~cb} callback
*/
function rm(argv, callback) {
  util.rm(argv[2], function(err, val) {
    if (!err) {
      console.log('rm to : ' + argv[2]);
    }
  });
}


/**
* rm as a command
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


module.exports = rm;

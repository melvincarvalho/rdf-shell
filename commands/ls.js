var util = require ('./util.js');


/**
* ls gets list of files for a given container
*
* @param {String} argv[2] url
* @callback {bin~cb} callback
*/
function ls(argv, callback) {
  util.getAll(argv[2], function(err, val) {
    for (var i=0; i<val.length; i++) {
      if (val[i].predicate.uri === 'http://www.w3.org/ns/ldp#contains') {
        console.log(val[i].object.uri);
      }
    }
  });
}


/**
* ls as a command
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


module.exports = ls;

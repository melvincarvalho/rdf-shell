#!/usr/bin/env node

/**
 * help message
 * @param  {array}   argv      arguments
 * @param  {Function} callback callback
 */
function help(argv, callback) {
  var ret = 'rdf help\n';
  ret += 'commands\n';
  ret += '  help                         - shows help message\n';
  callback(null, ret);
}

/**
 * version as a command
 */
function bin() {
  help(process.argv, function(err, ret){
    console.log(ret);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}

module.exports = help;

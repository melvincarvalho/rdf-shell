#!/usr/bin/env node

/**
* rdf calls child script
*
* @param {string} argv[2] command
* @callback {bin~cb} callback
*/
function rdf(argv, callback) {
  var command = argv[2];
  var exec;

  if (!command) {
    console.log('rdf help for command list');
    process.exit(-1);
  }
  exec = require('./commands/' + command + '.js');

  argv.splice(2, 1);

  exec(argv, callback);

}

/**
* rdf as a command
*
*/
function bin() {
  rdf(process.argv, function(err, res){
    console.log(res);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}

module.exports = rdf;

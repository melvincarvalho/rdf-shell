#!/usr/bin/env node

/**
 * help message
 * @param  {array}   argv      arguments
 * @param  {Function} callback callback
 */
function help(argv, callback) {
  var ret = 'rdf help\n';
  ret += 'commands\n';
  ret += '  rdf cat <uri>                    - displays a uri\n';
  ret += '  rdf help                         - shows help message\n';
  ret += '  rdf ls <uri>                     - shows files in a container\n';
  ret += '  rdf obj <uri>                    - watches the first found object\n';
  ret += '  rdf patch <uri> <data>           - patch turtle data to a file\n';
  ret += '  rdf post <uri> <data>            - posts turtle data to a file\n';
  ret += '  rdf put <uri> <data>             - puts turtle data to a file\n';
  ret += '  rdf rm <uri>                     - removes a uri\n';
  ret += '  rdf sub <uri>                    - subscribes to a uri\n';
  ret += '  rdf tail <uri>                   - watches a URI for changes\n';
  ret += '  rdf touch <uri>                  - touches a uri\n';
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

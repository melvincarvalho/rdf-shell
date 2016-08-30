#!/usr/bin/env node

var shell = require ('../');

/**
 * patch a resource
 * @param  {string} argv[2] The URI to be patched
 * @param  {string} argv[3] The data to patch
 */
function bin(argv) {

  var patchURI = argv[2]
  var patch    = argv[3]

  shell.patch(patchURI, patch, function(err, res) {
    if (err) {
      console.error(err)
    } else {
      console.log(res)
    }
  })
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}

module.exports = bin

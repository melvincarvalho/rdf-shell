#!/usr/bin/env node

var shell = require ('../')

/**
 * list the contents of a directory
 * @param  {[type]} argv [description]
 * @return {[type]}      [description]
 */
function bin(argv) {
  var uri = argv[2]
  if (!uri) {
    console.error('uri is required')
  }
  shell.ls(uri, function(err, arr) {
    for (i=0; i<arr.length; i++) {
      console.log(arr[i])
    }
  })
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}

module.exports = bin

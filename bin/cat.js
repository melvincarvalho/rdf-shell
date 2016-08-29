#!/usr/bin/env node

var shell = require('../')

/**
 * cat as a command
 * @param  {Array} argv Args, argv[2] is the uri
 */
function bin(argv) {
  if (!argv[2]) {
    console.error("url is required")
    console.error("Usage : cat <url>")
    process.exit(-1)
  }
  shell.cat(argv[2], function(err, res, uri) {
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

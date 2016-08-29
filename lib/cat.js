#!/usr/bin/env node

var util = require ('./util.js')

/**
 * cat gets the turtle for a uri
 * @param  {string}   uri      The URI to get
 * @param  {Function} callback Callback with text and uri
 */
function cat(uri, callback) {
  if (!uri) {
    callback(new Error('URI is required'))
  }
  util.get(uri, function(err, val, uri) {
    callback(null, val, uri)
  })
}

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
  cat(argv[2], function(err, res, uri) {
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

module.exports = cat

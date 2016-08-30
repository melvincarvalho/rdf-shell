#!/usr/bin/env node

var util = require ('./util.js')

/**
 * patch a resource
 * @param  {string} patchURI The URI to be patched
 * @param  {string} patch    The data to patch
 */
function patch(patchURI, patch, callback) {

  util.patch(patchURI, patch, function(err, res) {
    if (err) {
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}

module.exports = patch

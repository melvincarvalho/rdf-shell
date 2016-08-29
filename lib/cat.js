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

module.exports = cat

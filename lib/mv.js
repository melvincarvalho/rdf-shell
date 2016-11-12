#!/usr/bin/env node

var util = require('./util.js')

/**
 * Move rdf from a source to a destination.
 * @param  {string}   sourceURI The source URI
 * @param  {string}   destURI   The dest URI
 * @param  {function} callback Callback with result
 */
function mv (sourceURI, destURI, callback) {
  if (!sourceURI) {
    callback(new Error('source URI is required'))
  }
  if (!destURI) {
    callback(new Error('dest URI is required'))
  }
  util.get(sourceURI, function (err, val, uri) {
    util.put(destURI, val, function (err, ret, uri) {
      if (!err) {
        util.rm(sourceURI, function(err, ret) {
          if (!err) {
            callback(null, ret, uri)
          } else {
            callback(err)
          }
        })
      } else {
        callback(err)
      }
    })
  })
}

module.exports = mv

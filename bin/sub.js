#!/usr/bin/env node

var debug = require('debug')('rdf-shell:sub')
var shell = require('../')
var ws = require('ws')

/**
 * sub as a command
 *
 * @param {String} argv[2] login
 * @callback {bin~cb} callback
 */
function bin (argv) {
  shell.sub(argv[2], function (err, res) {
    debug(res)
  })
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}

module.exports = bin

#!/usr/bin/env node

var debug = require('debug')('rdf-shell:cp')
var pkg = require('../package.json')
var program = require('commander')
var shell = require('../')

/**
 * cp as a command.
 * @param {Array} argv Arguments
 */
function bin (argv) {
  program.version(pkg.version)
  .usage('[options] <sourceURI> <destURI>')
  .parse(argv)

  var sourceURI = program.args[0]
  var destURI = program.args[1]

  if (!sourceURI || !destURI) {
    program.help()
  }

  shell.cp(sourceURI, destURI, function (err, res, uri) {
    if (!err) {
      debug(res)
    } else {
      console.error(err)
    }
  })
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}

module.exports = bin

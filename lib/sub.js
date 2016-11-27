#!/usr/bin/env node

var debug = require('debug')('rdf-shell:sub')
var ws = require('ws')

/**
 * sub gets list of files for a given container
 *
 * @param {String} argv[2] url
 * @callback {bin~cb} callback
 */
function sub (subURI, callback) {
  if (!subURI) {
    callback(new Error('uri is required'))
    return
  }
  var domain = subURI.split('/')[2]
  var wss = 'wss://' + domain + '/'

  var Socket = new ws(wss, {
    origin: 'http://websocket.org'
  })

  Socket.on('open', function open () {
    debug('connected')
    Socket.send('sub ' + subURI)
  })

  Socket.on('close', function close () {
    debug('disconnected')
  })

  Socket.on('message', function message (data, flags) {
    debug(data)
    callback(data)
  })
}

/**
 * sub as a command
 *
 * @param {String} argv[2] login
 * @callback {bin~cb} callback
 */
function bin (argv) {
  sub(argv[2], function (err, res) {
    debug(res)
  })
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv)
}

module.exports = sub

$rdf       = require('rdflib')
var debug  = require('debug')('rdf-util')
var url    = require('url')
var https  = require('https')
var fs     = require("fs")

var CHAT  = $rdf.Namespace("https://ns.rww.io/chat#")
var CURR  = $rdf.Namespace("https://w3id.org/cc#")
var DCT   = $rdf.Namespace("http://purl.org/dc/terms/")
var FACE  = $rdf.Namespace("https://graph.facebook.com/schema/~/")
var FOAF  = $rdf.Namespace("http://xmlns.com/foaf/0.1/")
var LIKE  = $rdf.Namespace("http://ontologi.es/like#")
var LDP   = $rdf.Namespace("http://www.w3.org/ns/ldp#")
var MBLOG = $rdf.Namespace("http://www.w3.org/ns/mblog#")
var OWL   = $rdf.Namespace("http://www.w3.org/2002/07/owl#")
var PIM   = $rdf.Namespace("http://www.w3.org/ns/pim/space#")
var RDF   = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
var RDFS  = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#")
var SIOC  = $rdf.Namespace("http://rdfs.org/sioc/ns#")
var SOLID = $rdf.Namespace("http://www.w3.org/ns/solid/app#")
var TMP   = $rdf.Namespace("urn:tmp:")

var storageURI = 'https://clip.databox.me/Public/.clip/Public/test'

var TIMEOUT = 2000
var g = $rdf.graph()
var f = $rdf.fetcher(g, TIMEOUT)

function getAny(URI, callback) {
  f.unload(URI)
  f.refresh($rdf.sym(URI))
  f.requested[URI] = 'unrequested'

  get(URI, function(err, val) {
    if (err) {
      callback(err)
    } else {
      var g = $rdf.graph()
      $rdf.parse(val, g, URI, 'text/turtle')
      var any = g.any(null, null, null, $rdf.sym(URI))
      callback(null, any)
    }
  })

}

function getAll(URI, callback) {
  f.unload(URI)
  f.refresh($rdf.sym(URI))
  f.requested[URI] = 'unrequested'

  get(URI, function(err, val) {
    if (err) {
      callback(err)
    } else {
      var g = $rdf.graph()
      $rdf.parse(val, g, URI, 'text/turtle')
      var all = g.statementsMatching(null, null, null, $rdf.sym(URI))
      callback(null, all)
    }
  })
}

/**
 * putStorage Sends turtle data to remote storage via put request
 * @param  {String}   host     The host to send to
 * @param  {String}   path     The path relative to host
 * @param  {String}   data     The turtle to send
 * @param  {String}   cert     Certificate path used for auth
 * @param  {Function} callback Callback with error or response
 */
function putStorage(host, path, data, cert, callback) {
  var protocol = 'https://'

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'PUT',
    headers:  {'Content-Type': 'text/turtle'}
  }

  if (cert) {
    ldp.key = fs.readFileSync(cert)
    ldp.cert = fs.readFileSync(cert)
  }

  // put file to ldp
  ldp.path = path
  debug('sending to : ' + protocol + host + path)
  var put = https.request(ldp, function(res) {
    chunks = ''
    debug('STATUS: ' + res.statusCode)
    debug('HEADERS: ' + JSON.stringify(res.headers))
    res.on('data', function (chunk) {
      chunks += chunk
    })
    res.on('end', function (chunk) {
      callback(null, chunks, ldp)
    })
  })

  put.on('error', function(e) {
    callback(e)
  })

  put.write(data)
  put.end()
}

/**
 * postStorage Sends turtle data to remote storage via put request
 * @param  {String}   host     The host to send to
 * @param  {String}   path     The path relative to host
 * @param  {String}   data     The turtle to send
 * @param  {String}   cert     Certificate path used for auth
 * @param  {Function} callback Callback with error or response
 */
function postStorage(host, path, data, cert, callback) {
  var protocol = 'https://'

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'POST',
    headers:  {'Content-Type': 'text/turtle'}
  }

  if (cert) {
    ldp.key = fs.readFileSync(cert)
    ldp.cert = fs.readFileSync(cert)
  }

  // put file to ldp
  ldp.path = path
  debug('sending to : ' + protocol + host + path)
  var put = https.request(ldp, function(res) {
    chunks = ''
    debug('STATUS: ' + res.statusCode)
    debug('HEADERS: ' + JSON.stringify(res.headers))
    res.on('data', function (chunk) {
      chunks += chunk
    })
    res.on('end', function (chunk) {
      callback(null, chunks)
    })
  })

  put.on('error', function(e) {
    callback(e)
  })

  put.write(data)
  put.end()
}

/**
 * patchStorage Sends turtle data to remote storage via patch request
 * @param  {String}   host     The host to send to
 * @param  {String}   path     The path relative to host
 * @param  {String}   data     The turtle to send
 * @param  {String}   cert     Certificate path used for auth
 * @param  {Function} callback Callback with error or response
 */
function patchStorage(host, path, data, cert, callback) {
  var protocol = 'https://'

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'PATCH',
    headers:  {'Content-Type': 'application/sparql-update'}
  }

  if (cert) {
    ldp.key = fs.readFileSync(cert)
    ldp.cert = fs.readFileSync(cert)
  }

  // put file to ldp
  ldp.path = path
  debug('sending to : ' + protocol + host + path)
  var put = https.request(ldp, function(res) {
    chunks = ''
    debug('STATUS: ' + res.statusCode)
    debug('HEADERS: ' + JSON.stringify(res.headers))
    res.on('data', function (chunk) {
      chunks += chunk
    })
    res.on('end', function (chunk) {
      callback(null, chunks)
    })
  })

  put.on('error', function(e) {
    callback(e)
  })

  put.write(data)
  put.end()
}

/**
 * getTLS Gets data from remote storage via get request
 * @param  {String}   host     The host to send to
 * @param  {String}   path     The path relative to host
 * @param  {String}   cert     Certificate path used for auth
 * @param  {Function} callback Callback with error or response
 */
function getTLS(host, path, cert, callback) {
  var protocol = 'https://'

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'GET',
    headers:  {'Content-Type': 'application/sparql-update'}
  }

  if (cert) {
    ldp.key = fs.readFileSync(cert)
    ldp.cert = fs.readFileSync(cert)
  }

  // put file to ldp
  ldp.path = path
  debug('sending to : ' + protocol + host + path)
  var req = https.request(ldp, function(res) {
    chunks = ''
    debug('STATUS: ' + res.statusCode)
    debug('HEADERS: ' + JSON.stringify(res.headers))
    res.on('data', function (chunk) {
      chunks += chunk
    })
    res.on('end', function (chunk) {
      callback(null, chunks, protocol + host + path)
    })
  })

  req.on('error', function(e) {
    callback(e)
  })

  req.end()
}

/**
 * deleteStorage Sends turtle data to remote storage via delete request
 * @param  {String}   host     The host to send to
 * @param  {String}   path     The path relative to host
 * @param  {String}   cert     Certificate path used for auth
 * @param  {Function} callback Callback with error or response
 */
function deleteStorage(host, path, cert, callback) {
  var protocol = 'https://'

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'DELETE',
    headers:  {'Content-Type': 'text/turtle'}
  }

  if (cert) {
    ldp.key = fs.readFileSync(cert)
    ldp.cert = fs.readFileSync(cert)
  }

  // put file to ldp
  ldp.path = path
  debug('sending to : ' + protocol + host + path)
  var put = https.request(ldp, function(res) {
    chunks = ''
    debug('STATUS: ' + res.statusCode)
    debug('HEADERS: ' + JSON.stringify(res.headers))
    res.on('data', function (chunk) {
      chunks += chunk
    })
    res.on('end', function (chunk) {
      callback(null, chunks, ldp)
    })
  })

  put.on('error', function(e) {
    callback(e)
  })

  put.end()
}

function patch(uri, data, callback){
  var a = url.parse(uri)
  patchStorage(a.host, a.path, data, process.env.CERT, callback)
}

function rm(uri, callback){
  var a = url.parse(uri)
  //console.log(a)
  deleteStorage(a.host, a.path, process.env.CERT, callback)
}

function put(uri, data, callback){
  var a = url.parse(uri)
  //console.log(a)
  putStorage(a.host, a.path, data, process.env.CERT, callback)
}

/**
 * gets the content of a URI also uses env.CERT
 * @param  {string}   uri      The uri to get
 * @param  {Function} callback Callback
 */
function get(uri, callback){
  var a = url.parse(uri)
  getTLS(a.host, a.path, process.env.CERT, callback)
}

function post(uri, data, callback){
  var a = url.parse(uri)
  //console.log(a)
  postStorage(a.host, a.path, data, process.env.CERT, callback)
}

/**
 * Gets primary topic for a uri.  foaf : primaryTopic is check for or <#this>
 * @param  {object} store an rdflib store
 * @param  {string} uri   a uri
 * @return {string} the primary topic or null
 */
function primaryTopic(store, uri) {
  var ret
  var pred

  var FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/")

  var ret = store.any($rdf.sym(uri), FOAF('primaryTopic'), null, $rdf.sym(uri))

  if (!ret) {
    var sub = $rdf.sym(uri + '#this')
    pred = store.any(sub, null, null, $rdf.sym(uri))
    if (pred) {
      ret = sub.uri
    }
  } else {
    ret = ret.uri
  }

  return ret
}

/**
 * See if a URI is a certain type
 * @param  {object}  store the rdflib store
 * @param  {string}  uri   the uri to check
 * @param  {string}  type  the type to test
 * @return {Boolean}       true if uri is that type
 */
function is(store, uri, type) {
  var ret = false

  var types = store.findTypeURIs($rdf.sym(uri))

  if (types && types[type]) {
    ret = true
  }

  return ret
}


module.exports = {
  getAll      : getAll,
  get         : get,
  getAny      : getAny,
  is          : is,
  put         : put,
  rm          : rm,
  patch       : patch,
  post        : post,
  primaryTopic : primaryTopic
}

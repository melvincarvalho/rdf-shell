$rdf       = require('rdflib');
var debug  = require('debug')('rdf-util');
var url    = require('url');
var https  = require('https');
var fs     = require("fs");

var CHAT  = $rdf.Namespace("https://ns.rww.io/chat#");
var CURR  = $rdf.Namespace("https://w3id.org/cc#");
var DCT   = $rdf.Namespace("http://purl.org/dc/terms/");
var FACE  = $rdf.Namespace("https://graph.facebook.com/schema/~/");
var FOAF  = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
var LIKE  = $rdf.Namespace("http://ontologi.es/like#");
var LDP   = $rdf.Namespace("http://www.w3.org/ns/ldp#");
var MBLOG = $rdf.Namespace("http://www.w3.org/ns/mblog#");
var OWL   = $rdf.Namespace("http://www.w3.org/2002/07/owl#");
var PIM   = $rdf.Namespace("http://www.w3.org/ns/pim/space#");
var RDF   = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var RDFS  = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
var SIOC  = $rdf.Namespace("http://rdfs.org/sioc/ns#");
var SOLID = $rdf.Namespace("http://www.w3.org/ns/solid/app#");
var TMP   = $rdf.Namespace("urn:tmp:");

var storageURI = 'https://clip.databox.me/Public/.clip/Public/test';

var TIMEOUT = 2000;
var g = $rdf.graph();
var f = $rdf.fetcher(g, TIMEOUT);



function getAny(URI, callback) {
  f.requestURI(URI, undefined, true, function(ok, body) {
    var any = g.any(null, null, null, $rdf.sym(URI));
    callback(null, any);
  });
}

function getAll(URI, callback) {
  f.requestURI(URI, undefined, true, function(ok, body) {
    var all = g.statementsMatching(null, null, null, $rdf.sym(URI));
    callback(null, all);
  });
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
  var protocol = 'https://';

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'PUT',
    headers:  {'Content-Type': 'text/turtle'}
  };

  if (cert) {
    ldp.key = fs.readFileSync(cert);
    ldp.cert = fs.readFileSync(cert);
  }

  // put file to ldp
  ldp.path = path;
  debug('sending to : ' + protocol + host + path);
  var put = https.request(ldp, function(res) {
    chunks = '';
    debug('STATUS: ' + res.statusCode);
    debug('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
      chunks += chunk;
    });
    res.on('end', function (chunk) {
      callback(null, chunks);
    });
  });

  put.on('error', function(e) {
    callback(e);
  });

  put.write(data);
  put.end();
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
  var protocol = 'https://';

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'POST',
    headers:  {'Content-Type': 'text/turtle'}
  };

  if (cert) {
    ldp.key = fs.readFileSync(cert);
    ldp.cert = fs.readFileSync(cert);
  }

  // put file to ldp
  ldp.path = path;
  debug('sending to : ' + protocol + host + path);
  var put = https.request(ldp, function(res) {
    chunks = '';
    debug('STATUS: ' + res.statusCode);
    debug('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
      chunks += chunk;
    });
    res.on('end', function (chunk) {
      callback(null, chunks);
    });
  });

  put.on('error', function(e) {
    callback(e);
  });

  put.write(data);
  put.end();
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
  var protocol = 'https://';

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'PATCH',
    headers:  {'Content-Type': 'application/sparql-update'}
  };

  if (cert) {
    ldp.key = fs.readFileSync(cert);
    ldp.cert = fs.readFileSync(cert);
  }

  // put file to ldp
  ldp.path = path;
  debug('sending to : ' + protocol + host + path);
  var put = https.request(ldp, function(res) {
    chunks = '';
    debug('STATUS: ' + res.statusCode);
    debug('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
      chunks += chunk;
    });
    res.on('end', function (chunk) {
      callback(null, chunks);
    });
  });

  put.on('error', function(e) {
    callback(e);
  });

  put.write(data);
  put.end();
}

/**
 * deleteStorage Sends turtle data to remote storage via delete request
 * @param  {String}   host     The host to send to
 * @param  {String}   path     The path relative to host
 * @param  {String}   cert     Certificate path used for auth
 * @param  {Function} callback Callback with error or response
 */
function deleteStorage(host, path, cert, callback) {
  var protocol = 'https://';

  var ldp = {
    hostname: host,
    rejectUnauthorized: false,
    port:     443,
    method:   'PUT',
    headers:  {'Content-Type': 'text/turtle'}
  };

  if (cert) {
    ldp.key = fs.readFileSync(cert);
    ldp.cert = fs.readFileSync(cert);
  }

  // put file to ldp
  ldp.path = path;
  debug('sending to : ' + protocol + host + path);
  var put = https.request(ldp, function(res) {
    chunks = '';
    debug('STATUS: ' + res.statusCode);
    debug('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
      chunks += chunk;
    });
    res.on('end', function (chunk) {
      callback(null, chunks);
    });
  });

  put.on('error', function(e) {
    callback(e);
  });

  put.end();
}

function patch(uri, data, callback){
  var a = url.parse(uri);
  patchStorage(a.host, a.path, data, process.env.CERT, callback);
}

function rm(uri, callback){
  var a = url.parse(uri);
  //console.log(a);
  deleteStorage(a.host, a.path, process.env.CERT, callback);
}

function put(uri, data, callback){
  var a = url.parse(uri);
  //console.log(a);
  putStorage(a.host, a.path, data, process.env.CERT, callback);
}

function post(uri, data, callback){
  var a = url.parse(uri);
  //console.log(a);
  postStorage(a.host, a.path, data, process.env.CERT, callback);
}

module.exports = {
  getAll      : getAll,
  getAny      : getAny,
  put         : put,
  rm          : rm,
  patch       : patch,
  post        : post
};

#!/usr/bin/env node

var util = require ('./util.js')

/**
 * get the contents of a container as an array
 * @param  {[type]}   argv     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function ls(uri, callback) {
  if (!uri) {
    callback(new Error('uri is required'))
  }
  util.getAll(uri, function(err, val) {
    var res = {}
    for (var i=0; i<val.length; i++) {
      if (val[i].predicate.uri === 'http://www.w3.org/ns/ldp#contains') {
        if (! res[val[i].object.uri]) res[val[i].object.uri] = {}
        res[val[i].object.uri].contains = val[i].object.uri
      }
      if (val[i].predicate.uri === 'http://www.w3.org/ns/posix/stat#mtime') {
        if (! res[val[i].subject.uri]) res[val[i].subject.uri] = {}
        res[val[i].subject.uri].mtime = val[i].object.value
      }

    }

    var arr =[]
    for( var k in res ) {
      if (res.hasOwnProperty(k)) {
        if (k && res[k] && res[k].mtime && res[k].contains) {
          arr.push({ file : res[k].contains, mtime : res[k].mtime })
        }
      }
    }

    arr = arr.sort(function(a, b){
      if (a.mtime < b.mtime) return -1
      if (a.mtime > b.mtime) return 1
      return 0
    })

    var ret = []
    for (i=0; i<arr.length; i++) {
      ret.push(arr[i].file)
    }

    callback(null, ret)
  })
}

module.exports = ls

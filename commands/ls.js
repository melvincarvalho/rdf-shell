var util = require ('./util.js');


/**
* ls gets list of files for a given container
*
* @param {String} argv[2] url
* @callback {bin~cb} callback
*/
function ls(argv, callback) {
  util.getAll(argv[2], function(err, val) {
    var res = {};
    for (var i=0; i<val.length; i++) {
      if (val[i].predicate.uri === 'http://www.w3.org/ns/ldp#contains') {
        if (! res[val[i].object.uri]) res[val[i].object.uri] = {};
        res[val[i].object.uri].contains = val[i].object.uri;
        console.log(val[i].object.uri);
      }
      if (val[i].predicate.uri === 'http://www.w3.org/ns/posix/stat#mtime') {
        if (! res[val[i].subject.uri]) res[val[i].subject.uri] = {};
        res[val[i].subject.uri].mtime = val[i].object.value;
        console.log(val[i].object.value);
      }

    }

    var arr =[];
    for( var k in res ) {
      if (res.hasOwnProperty(k)){
        arr.push({ file : k, mtime : res[k].mtime });
      }
    }

    console.log(arr);


    arr = arr.sort(function(a, b){
      if (a.mtime < b.mtime) return -1;
      if (a.mtime > b.mtime) return 1;
      return 0;
    });

    for (i=0; i<arr.length; i++) {
      console.log(arr[i].file);
    }
  });
}


/**
* ls as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
*/
function bin(argv) {
  id(argv, function(err, res) {
    console.log(res);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = ls;

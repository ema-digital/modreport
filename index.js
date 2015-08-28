var recursive = require('recursive-readdir'),
  fs = require('fs'),
  path = require('upath'),
  moment = require('moment');

var modsince = function(err, ms) { 
  recursive('../../', ['node_modules', '.git', '.sass-cache', 'foo.cs', '*.html'], function (err, files) {
    if (err) {
      console.log(err);
    }
    var compare_time = moment().subtract('2', 'months');
      
    files.forEach(function(element, index, array) {
      
      fs.stat(element, function(err, stats) {
        if (err) {
          console.log(err);
        }
        if (stats.isFile()) {
          var mod_time = new Date(stats.mtime).getTime();
        
          if ( moment( mod_time ).isAfter( compare_time ) ) {
            console.log( path.normalize(element) );
          }
        }
      });
    });
  });
};

if (require.main === module) {
  modsince();
}
else {
  exports.modsince = modsince;
}
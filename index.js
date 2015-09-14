#!/usr/bin/env node
var commandopts = require('./lib/command').command(process.argv),
  recursive = require('recursive-readdir'),
  fs = require('fs'),
  path = require('upath'),
  moment = require('moment');

var modsince = function(err, ms) { 
  recursive(process.cwd(), ['node_modules', '.git', '.sass-cache', '.svn', '.bak'], function (err, files) {
    if (err) {
      console.log(err);
    }
    else {
      if (moment(commandopts.start).isValid()) {
      
        var compare_time = moment().format(commandopts.start);
        
        files.forEach(function(element, index, array) {
          
          fs.stat(element, function(err, stats) {
            if (err) {
              console.log(err);
            }
            if (stats.isFile()) {
              var mod_time = new Date(stats.mtime).getTime();
              
              if (moment(mod_time).isAfter(compare_time) ) {
                var file = path.normalize(element);
                
                file = file.replace(path.normalize(process.cwd()), '.');
                console.log(file);
              }
            }
          });
          
        });
      }
      else {
        console.log('An invalid date was used as a command line option');
      }
    }
  });
  
};

if (require.main === module) {
  modsince();
}
else {
  exports.modsince = modsince;
}
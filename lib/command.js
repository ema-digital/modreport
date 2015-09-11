#!/usr/bin/env node
var fs = require('fs'),
  os = require('os'),
  path = require('path'),
  program = require('commander'),
  isWindows = false;

// builds the command line options and
// returns an array that will eventually set
// the flags that are used when the rsync function
// is called
exports.command = function(argv){
  
  program
    .option('--start <YYYY-MM-DD>', 'Start date in YYYY-MM-DD format')
    .option('--end <YYYY-MM-DD>', 'End date in YYYY-MM-DD format');
  
  program.parse(process.argv);

  return {
    start: program.start,
    end: program.end
  };
};

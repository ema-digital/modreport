/*jshint expr: true*/
var chai = require('chai'),
  expect = chai.expect,
  command = require('./../lib/command'),
  modreport = require('./../index'),
  program = require('commander');
  
  program.option('-u'); // adds the -u flag that is added by mocha

describe('modreport', function() {
  
  it('should export a modreport module', function(){
    expect(typeof modreport.modreport).to.equal('function');
  });
  
});

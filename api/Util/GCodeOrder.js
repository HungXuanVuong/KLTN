var generateCodeOrder = require('password-generator');

var Length = 10;
var uppercaseMinCount = 4;
var lowercaseMinCount = 4;
var numberMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

function isStrongEnough(codeorder) {
  var uc = codeorder.match(UPPERCASE_RE);
  var lc = codeorder.match(LOWERCASE_RE);
  var n = codeorder.match(NUMBER_RE);
  var nr = codeorder.match(NON_REPEATING_CHAR_RE);
  return !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount;
}

const generatorCode = function gCodeOrder() {
  var codeorder = "";
  var randomLength = Math.floor(Math.random()) + Length;
  while (!isStrongEnough(codeorder)) {
    codeorder = generateCodeOrder(randomLength, false, /[\w\d\?\-]/);
  }
  return codeorder;
}


module.exports = {
    generatorCode
}
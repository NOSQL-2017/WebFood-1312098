var moment = require('moment');

console.log(moment().format());

var now = moment();

console.log('Current timestamp : ' + now.unix());

var timstemp = 1490930852;
var current  = moment.unix(timstemp);

console.log('Current: ' + current.format('MMMM Do Y @ H:mm A'));



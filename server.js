var db = require('./modules/db');
console.log("starting service [" + new Date().toISOString() + "]");
//6 hours update
db.clanUpdate();
setInterval(function () { db.clanUpdate() }, 1000*60*60*6);//21600000
console.log("clanUpdate");

//rank update
db.globalRankUpdate();
setInterval(function () { db.globalRankUpdate() }, 1000*60*60);
console.log("globalRankUpdate");

console.log("service started [" + new Date().toISOString() + "]");
var db = require('./modules/db');

//6 hours update
db.clanUpdate();
setInterval(function () { db.clanUpdate() }, 1000*60*60*6);//21600000

//rank update
db.globalRankUpdate();
setInterval(function () { db.globalRankUpdate() }, 1000*60*60);
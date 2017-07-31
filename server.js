var db = require('./modules/db');
console.log(db.timeStamp() + " service starting...");
var counter = 0;
//6 hours update
db.clanUpdate();
//rank update
db.globalRankUpdate();
db.playerUpdate();
//setInterval(function () { db.clanUpdate() }, 1000*60*60*6);//21600000


setInterval(function () { 
    //every hour
    db.globalRankUpdate() 
    //every 6 hours
    if(counter % 6 == 0) db.clanUpdate();
    //every 24 hours
    if(counter % 24 == 0) db.playerUpdate();
    counter++;
}, 1000*60*60);

console.log(db.timeStamp() + " service started...");
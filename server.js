var db = require('./modules/db');
console.log(db.timeStamp() + " service starting...");
var counter = 0;

db.globalRankUpdate();
/*db.clanUpdate();
db.playerUpdate();*/

db.countryRankUpdate();

/*setInterval(function () { 
    //every hour
    db.globalRankUpdate() 
    //every 6 hours
    if(counter % 6 == 0) db.clanUpdate();
    //every 24 hours
    if(counter % 24 == 0) db.playerUpdate();
    counter++;
}, 1000*60*60);*/

console.log(db.timeStamp() + " service started...");
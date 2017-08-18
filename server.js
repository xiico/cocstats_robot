var  schedule  =  require('node-schedule');
require('dotenv').config({ path: __dirname + '/.env' });
var db = require('./modules/db');

console.log(db.timeStamp() + " service starting...");

//var rule = new schedule.RecurrenceRule('*/1 * * * *');
//rule.second = 90;
var everyHour = schedule.scheduleJob('0 */1 * * *', function () {
    db.globalRankUpdate()
});

var everySixHour = schedule.scheduleJob('0 */6 * * *', function () {
    db.clanUpdate();
});

var everyDay = schedule.scheduleJob('0 0 * * *', function () {
    db.playerUpdate();
    db.countryRankUpdate();
});

// //require('dotenv').config();
// var counter = 0;

// db.globalRankUpdate();
// db.clanUpdate();
// db.playerUpdate();
// db.countryRankUpdate();

// setInterval(function () { 
//     //every hour
//     db.globalRankUpdate() 
//     //every 6 hours
//     if(counter % 6 == 0) db.clanUpdate();
//     //every 24 hours
//     if(counter % 24 == 0) db.playerUpdate();
//     //every 24 hours
//     if(counter % 24 == 0) db.countryRankUpdate();
//     counter++;
// }, 1000*60*60);

console.log(db.timeStamp() + " service started...");
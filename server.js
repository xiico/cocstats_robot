var https = require('https');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

//models
var Clan = require('./models/clan');
var Member = require('./models/member');
var clanHistory = require('./models/clanHistory');




// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

function saveDataToDataBase(error, obj) {
    Clan.findOneAndUpdate({ tag: obj.tag }, obj, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, clan) {
        if (err)
            throw err;
        if (clan) {
            var insert = {
                tag: obj.tag
            };
            clanHistory.findOneAndUpdate({ tag: insert.tag }, insert, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, ch) {
                if (err)
                    throw err;
                if (ch) {
                    if (!ch.history)
                        ch.history = [];
                    ch.history.push({
                        clanLevel: clan.clanLevel,
                        warWins: clan.warWins,
                        warWinStreak: clan.warWinStreak,
                        clanPoints: clan.clanPoints,
                        trophies: clan.trophies,
                        members: clan.members,
                        date: new Date()
                    });
                    ch.save(function (error) {
                        if (error)
                            throw error;
                    });
                }
            })
        }
    });
}

setInterval(function () { getClanInfo(saveDataToDataBase) }, 60000);//21600000


function getClanInfo(cb) {
    Clan.find({}, function (err, clans) {
        if (err)
            throw err;
        clans.forEach(function (clan) {
            https.get({
                host: 'api.clashofclans.com',
                path: '/v1/clans/%23' + clan.tag.replace("#", ""),//80U9PL8P 
                headers: { 'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY5NDBlOTYxLWQ2MTMtNGI3Ni05MDBhLTlhNTI2NGNlYzZhNyIsImlhdCI6MTQ2NjQ2NTM4Miwic3ViIjoiZGV2ZWxvcGVyLzhhZmQ5ZjJhLWQzNmEtYzdkMS1jZjgxLTRmZGExN2Q1ZWZlZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1LjU1LjIyMS4yMjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.4SWOJT3Qac_XTB2Y2ay9dgQ7f8L6j5C59nzwXGQPqyJ1Mkxs4V2xzVqXPacp10ywvDmrOid9tb_2q-bsW_czLA' }
            }, function (res) {
                // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
                res.setEncoding('utf8');

                // incrementally capture the incoming response body
                var body = '';
                res.on('data', function (d) {
                    body += d;
                });

                // do whatever we want with the response once it's done
                res.on('end', function () {
                    try {
                        var parsed = JSON.parse(body);
                    } catch (err) {
                        console.error('Unable to parse response as JSON', err);
                        return cb(err);
                    }
/*
                    var sr = { "tag": "#YY0LJQQP", "name": "GilgaMesh", "type": "inviteOnly", "description": "Welcome to GilgaMesh...   Pinoy only... Rules 1. Be active in war... 2. enjoy lng... 3. Be loyal, love your clan... d kami gaano k active sa chat active naman kami sa war... matured only...                FB Group GilgaMesh (CoC)", "location": { "id": 32000185, "name": "Philippines", "isCountry": true, "countryCode": "PH" }, "badgeUrls": { "small": "https://api-assets.clashofclans.com/badges/70/Ay5USX9Dnhq3whEDbMrWfGJplOt3nCQ3l3lLrHmxrDI.png", "large": "https://api-assets.clashofclans.com/badges/512/Ay5USX9Dnhq3whEDbMrWfGJplOt3nCQ3l3lLrHmxrDI.png", "medium": "https://api-assets.clashofclans.com/badges/200/Ay5USX9Dnhq3whEDbMrWfGJplOt3nCQ3l3lLrHmxrDI.png" }, "clanLevel": 2, "clanPoints": 774, "requiredTrophies": 400, "warFrequency": "always", "warWinStreak": 0, "warWins": 4, "warTies": 0, "warLosses": 3, "isWarLogPublic": true, "members": 2, "memberList": [{ "tag": "#2U0VGVY20", "name": "xRYMTH", "role": "leader", "expLevel": 22, "league": { "id": 29000004, "name": "Silver League III", "iconUrls": { "small": "https://api-assets.clashofclans.com/leagues/72/QcFBfoArnafaXCnB5OfI7vESpQEBuvWtzOyLq8gJzVc.png", "tiny": "https://api-assets.clashofclans.com/leagues/36/QcFBfoArnafaXCnB5OfI7vESpQEBuvWtzOyLq8gJzVc.png", "medium": "https://api-assets.clashofclans.com/leagues/288/QcFBfoArnafaXCnB5OfI7vESpQEBuvWtzOyLq8gJzVc.png" } }, "trophies": 853, "clanRank": 1, "previousClanRank": 1, "donations": 0, "donationsReceived": 0 }, { "tag": "#2LPPUURLP", "name": "warnold", "role": "member", "expLevel": 18, "league": { "id": 29000000, "name": "Unranked", "iconUrls": { "small": "https://api-assets.clashofclans.com/leagues/72/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png", "tiny": "https://api-assets.clashofclans.com/leagues/36/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png" } }, "trophies": 696, "clanRank": 2, "previousClanRank": 2, "donations": 0, "donationsReceived": 0 }] };

                    parsed = sr;*/

                    if (parsed.tag)
                        cb(null, parsed);
                    else
                        console.log(body);
                });
            }).on('error', function (err) {
                // handle errors with the request itself
                console.error('Error with the request:', err.message);
                cb(err);
            });
        }, this);
    });
}

var mongoose = require('mongoose');
var configDB = require('../config/database.js');

//models
var Clan = require('../models/clan');
var Player = require('../models/player');
var playerHistory = require('../models/playerHistory');
var clanHistory = require('../models/clanHistory');
var cocRequest = require('../modules/cocRequest');
var Rank = require('../models/rank');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

function saveClan(error, obj) {
    // if(error) {
    //     return;
    // }
    Clan.findOneAndUpdate({ tag: obj.tag }, obj, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, clan) {
        if (err){
            console.log(err);
            return;
        }
        if (clan) {
            var insert = {
                tag: obj.tag
            };
            clanHistory.findOneAndUpdate({ tag: insert.tag }, insert, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, ch) {
                if (err){
                    console.log(err);
                    return;
                }
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
                        if (error){
                            console.log(timeStamp() + error);
                            return;
                        }
                    });
                }
            })
        }
    });
}

function savePlayer(error, obj) {
    // if(error) {
    //     return;
    // }
    Player.findOneAndUpdate({ tag: obj.tag }, {tag: obj.tag, name: obj.name}, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, player) {
        if (err){
            console.log(timeStamp() + err);
            return;
        }
        if (player) {
            var insert = {
                tag: obj.tag
            };
            player.date = new Date();
            player.trophies = obj.trophies;
            player.clan = obj.clan;
            player.expLevel = obj.expLevel;
            player.trophies = obj.trophies;
            player.attackWins = obj.attackWins;
            player.defenseWins = obj.defenseWins;
            if (obj.league) {
                player.league = {
                    "name": obj.league.name,
                    "iconUrls": {
                        "tiny": obj.league.iconUrls.tiny,
                    }
                }
            }
            player.save(function (error) {
                if (error){
                    console.log(timeStamp() + error);
                    return;
                }
            });
            playerHistory.findOneAndUpdate({ tag: insert.tag }, insert, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, ph) {
                if (err){
                    console.log(timeStamp() + err);
                    return;
                }
                if (ph) {
                    if (!ph.history)
                        ph.history = [];
                    ph.history.push({
                        "trophies": obj.trophies,
                        "townHallLevel": obj.townHallLevel,
                        "expLevel": obj.expLevel,
                        "bestTrophies": obj.bestTrophies,
                        "warStars": obj.warStars,
                        "attackWins": obj.attackWins,
                        "defenseWins": obj.defenseWins,
                        "builderHallLevel": obj.builderHallLevel,
                        "versusTrophies": obj.versusTrophies,
                        "bestVersusTrophies": obj.bestVersusTrophies,
                        "versusBattleWins": obj.versusBattleWins,
                        "role": obj.role,
                        "clan": obj.clan ? {
                            "tag": obj.clan.tag,
                            "name": obj.clan.name
                        } : null,
                        "legendStatistics": obj.legendStatistics ? {
                            "legendTrophies": obj.legendStatistics.legendTrophies,
                            "currentSeason": {
                                "rank": obj.legendStatistics.currentSeason ? obj.legendStatistics.currentSeason.rank : null,
                                "trophies": obj.legendStatistics.currentSeason ? obj.legendStatistics.currentSeason.trophies : null
                            }
                        } : null,
                        "versusBattleWinCount": obj.versusBattleWinCount,
                        "date": new Date()
                    });
                    ph.save(function (error) {
                        if (error){
                            console.log(timeStamp() + error);
                            return;
                        }
                    });
                }
            })
        }
    });
}

function saveRank(error, response, rnk) {
    // if(error) {
    //     return;
    // }
    Rank.findOneAndUpdate({ type: rnk.type }, rnk, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, rank) {
        if (err){
            console.log(timeStamp() +err);
            return;
        }
        if (rank.entries.length > 0 && (new Date(rank.entries[rank.entries.length - 1].date)).getDate() != new Date().getDate()) {
            for (var index = 0; index < rank.entries.length; index++) {
                rank.entries[index].remove();
            }
        }

        var rankEntry = {
            date: new Date(),
            items: response.items
        }

        rank.entries.push(rankEntry);

        rank.save(function (error) {
            if (error){
                console.log(timeStamp() + error);
                return;
            }
        });
    });
}

function saveCountryRank(error, response, rnk) {
    Rank.findOneAndUpdate({ location: rnk.location }, rnk, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, rank) {
        if (err){
            console.log(timeStamp() +err);
            return;
        }

        if(!rank.entries) rank.entries = [];

        while (rank.entries.length > 24) {
            rank.entries[rank.entries.length - 1].shift();
        }

        var rankEntry = {
            date: new Date(),
            items: response.items
        }

        rank.entries.push(rankEntry);

        rank.save(function (error) {
            if (error) {
                console.log(timeStamp() + error);
                return;
            }
        });
    });
}

function timeStamp() {
    return "[" + new Date().toISOString() + "]";
}

module.exports =
    {
        clanUpdate: function () {
            Clan.find({}, function (err, clans) {
                if (err){
                    console.log(err);
                    return;
                }
                console.log(timeStamp() + " updating " + clans.length + " clans...");
                for (var index = 0, clan; clan = clans[index]; index++) {
                    cocRequest.searchClans('clan', clan.tag, saveClan);
                }
            });
        },
        globalRankUpdate: function () {
            console.log(timeStamp() + " globalRankUpdates");
            cocRequest.searchClans('global', 54000, saveRank, { type: "global", date: new Date() });
        },
        countryRankUpdate: function () {
            console.log(timeStamp() + " countryRankUpdate");
            //db.ranks.find({type:{$not:{$eq:"global"}}},{type:1})
            Rank.find({type:{$not:{$eq:"global"}}}, { type: 1, location: 1 }, function (err, ranks) {
                if (err){
                    console.log(err);
                    return;
                }
                console.log(timeStamp() + " updating " + ranks.length + " ranks...");
                for (var index = 0, rank; rank = ranks[index]; index++) {
                    cocRequest.searchClans('country', rank.location, saveCountryRank, { type: "country", date: new Date(), location: rank.location });
                }                
            });
        },
        playerUpdate: function () {
            Player.find({}, function (err, players) {
                if (err){
                    console.log(err);
                    return;
                }
                console.log(timeStamp() + " updating " + players.length + " players...");
                for (var index = 0, player; player = players[index]; index++) {
                    cocRequest.searchClans('player', player.tag, savePlayer);
                }
            });
        },
        timeStamp: function() {
            return timeStamp();
        }
    }

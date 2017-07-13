
var mongoose = require('mongoose');
var configDB = require('../config/database.js');

//models
var Clan = require('../models/clan');
var Member = require('../models/member');
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

function saveRank(error, response, rnk) {
    // if(error) {
    //     return;
    // }
    Rank.findOneAndUpdate({ type: rnk.type }, rnk, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, rank) {
        if (err)
            throw err;
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
            if (error)
                throw error;
        });
    });
}

module.exports =
    {
        clanUpdate: function () {
            Clan.find({}, function (err, clans) {
                if (err)
                    throw err;
                for (var index = 0, clan; clan = clans[index]; index++) {
                    cocRequest.searchClans('clan', clan.tag, saveClan);
                }
            });
        },
        globalRankUpdate: function () {
            cocRequest.searchClans('global', 55000, saveRank, { type: "global", date: new Date() });
        }
    }
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var playerHistorySchema = mongoose.Schema({
    tag: String,
    history: [{
        "townHallLevel": Number,
        "expLevel": Number,
        "bestTrophies": Number,
        "warStars": Number,
        "attackWins": Number,
        "defenseWins": Number,
        "builderHallLevel": Number,
        "versusTrophies": Number,
        "bestVersusTrophies": Number,
        "versusBattleWins": Number,
        "role": String,
        "clan": {
            "tag": String,
            "name": String
        },
        "legendStatistics": {
            "legendTrophies": Number,
            "currentSeason": {
                "rank": Number,
                "trophies": Number
            }
        },
        "versusBattleWinCount": Number,
        "date": Date
    }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('playerHistory', playerHistorySchema);
// load the things we need
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var RankSchema = mongoose.Schema({
    date: Date,
    type: String,
    location: Number,
    entries: [
        {
            date: Date,
            items: [{
                tag: String,
                name: String,
                badgeUrls: {
                    small: String
                },
                location: {
                    id: Number,
                    name: String,
                    countryCode: String
                },
                clanLevel: Number,
                warWins: Number,
                warWinStreak: Number,
                clanPoints: Number,
                trophies: Number,
                members: Number,
                rank: Number,
                previousRank: Number
            }]
        }]
});

// create the model for rankEntry and expose it to our app
module.exports = mongoose.model('Rank', RankSchema);
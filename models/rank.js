// load the things we need
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var rankSchema = mongoose.Schema({
    date: Date,
    type: String,
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
                rank: 200,
                previousRank: 206
            }]
        }]
});

// create the model for rankEntry and expose it to our app
module.exports = mongoose.model('rank', rankSchema);
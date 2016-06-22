// load the things we need
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');

// define the schema for our clan model
var clanSchema = mongoose.Schema({
    tag: String,
    name: String,
    type: String,
    description: String,
    location: {
        id: Number,
        name: String,
        isCountry: Boolean,
        countryCode: String
    },
    badgeUrls: {
        small: String,
        large: String,
        medium: String
    },
    warFrequency: String,
    clanLevel: Number,
    warWins: Number,
    warWinStreak: Number,
    clanPoints: Number,
    requiredTrophies: Number,
    members: Number,
    memberList: [
        {
            tag: String,
            name: String,
            role: String,
            trophies: Number,
            expLevel: Number,
            league: {
                name: String,
                iconUrls: {
                    tiny: String
                }
            },
            donations: Number,
            donationsReceived: Number
        }
    ],
    active: Boolean
});

// create the model for clans and expose it to our app
module.exports = mongoose.model('Clan', clanSchema);
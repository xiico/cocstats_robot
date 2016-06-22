// load the things we need
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    tag: String,
    name: String,
    role: String,
    expLevel: Number,
    league: {
        id: Number,
        name: String
    },
    trophies: Number,
    clanRank: Number,
    previousClanRank: Number,
    donations: Number,
    donationsReceived: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Member', userSchema);
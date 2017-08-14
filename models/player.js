// load the things we need
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var playerSchema = mongoose.Schema({
    tag: String,
    name: String,
    trophies: Number,
    date: Date,
    "clan": {
      "tag": String,
      "name": String
    },
    expLevel: Number,
    attackWins: Number,
    defenseWins: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Player', playerSchema);
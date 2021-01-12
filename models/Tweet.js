const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Tweet = mongoose.model(
    'Tweet', {
        tweet: {type: String, required: true, min: 1},
        image: {type: String, min :1},
        username: {type: Schema.Types.ObjectId, ref: 'User'},
        date: {type: Date, default: Date.now()},
        userRetweeted: {type: Schema.Types.ObjectId, ref: 'User'},
    }
)

module.exports = Tweet;
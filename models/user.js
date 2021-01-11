const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    {
        first_name: {type: String, required: true, min: 1},
        last_name: {type: String, required: true, min: 1},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        retweets: {type: Array},
        likedTweets: {type: Array},
        bookmarks: {type: Array},
        location: {type: String},
        birthdate: {type: String},
        hyperlink: {type: String}
    }
)


module.exports = User;
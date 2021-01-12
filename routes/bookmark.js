const express = require('express');
const User = require('../models/User');
const Tweet = require('../models/Tweet.js');
const async = require('async');
const router = express.Router();

router.post('/', (req, res, next) => {
    const postid = req.body.postId;
    const user = req.body.user;
    
    async.series({
        tweet: function(callback) {
            Tweet.findById(postid)
                .populate('userRetweeted username')
                .exec(callback)
        }
    }, function(err, response) {
        let bookArr = user.bookmarks;
        if(response.tweet) {
            bookArr.push(response.tweet);
        } else {
        }
        // create new user object with updated bookmark arr
        let userUpdated = new User({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            _id: user._id,
            password: user.password,
            retweets: user.retweets,
            likedTweets: user.likedTweets,
            bookmarks: bookArr,
            location: user.location,
            birthdate: user.birthdate,
            hyperlink: user.hyperlink
        })

        User.findByIdAndUpdate(user._id, userUpdated, {}, (err, response) => {
            if(err) {
                return err;
            } else {
                let redirect={redirect: '/'}
                res.send(redirect);
            }
        })
    }
    )
})


router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let user = {};
    User.findById(id, (err, response) => {
        user = response;
        res.send(user);
    })
})

router.post('/unbookmark', (req, res, next) => {
    const postid = req.body.postId;
    const user = req.body.user;

    let bookmarks = user.bookmarks;
    let newArr = bookmarks.filter(book => book._id !== postid);
    
    let userUpdated = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        _id: user._id,
        password: user.password,
        retweets: user.retweets,
        likedTweets: user.likedTweets,
        bookmarks: newArr,
        location: user.location,
        birthdate: user.birthdate,
        hyperlinK: user.hyperlink
    })

    User.findByIdAndUpdate(user._id, userUpdated, {}, (err, response) => {
        if(err) {
            return err;
        } else {
            let redirect={redirect: '/'}
            res.send(redirect);
        }
    })

})


module.exports = router;
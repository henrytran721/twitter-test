const express = require('express');
const { isEmpty } = require('lodash');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const async = require('async');
const router = express.Router();


// tweet endpoint creates a new tweet object from mongoose model and pushes to db
router.post('/', (req, res, next) => {
    if(req.body.username) {
        User.findById(req.body.username, (err, response) => {
            if(err) {
                return next(err);
            } else {
                const tweet = new Tweet(
                    {
                        tweet: req.body.tweet,
                        image: '',
                        username: response
                    }
                )
                tweet.save((err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send({
                            redirect: '/'
                        })
                    }
                })
            }
        })
    }
})

// retweet
router.post('/retweet', async (req, res) => {
    let postId = req.body.postId;
    let user = req.body.user;
    let retweets = user.retweets;
    // query to find the post the user is retweeting
    async.series({
        findTweet: function(callback) {
            Tweet.findById(postId)
                .exec(callback)
        } 
    }, function(err, result) {
        if(err) {
            return err;
        } else {
            let retweet = result.findTweet;
            const tweet = new Tweet(
                {
                    date: new Date(),
                    tweet: retweet.tweet,
                    image: retweet.image,
                    username: retweet.username,
                    userRetweeted: user._id
                }
            )
            retweets.push(tweet);
            let userUpdated = new User({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                _id: user._id,
                password: user.password,
                retweets: retweets,
                likedTweets: user.likedTweets
            })
            
            User.findByIdAndUpdate(user._id, userUpdated, {}, (err, res) => {
                if(err) {
                    return err;
                } else {
                }
            })
            tweet.save((err) => {
                if(err) {
                    return err;
                } else {
                    let redirect = {redirect: '/'}
                    res.send(redirect);
                }
            })
        }
    })
})

// remove retweet
router.post('/unretweet', (req, res, next) => {
    let postId = req.body.postId;
    let user = req.body.user;
    let retweets = user.retweets;

    Tweet.findByIdAndDelete(postId, (err, response) => {
        if(err) {
            return next(err);
        } else {
            const result = retweets.filter(rt => rt._id !== postId)
            let userUpdated = new User({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                _id: user._id,
                password: user.password,
                retweets: result,
                likedTweets: user.likedTweets, 
                bookmarks: user.bookmarks,
                location: user.location,
                birthdate: user.birthdate,
                hyperlinK: user.hyperlink
            })
            User.findByIdAndUpdate(user._id, userUpdated, {}, (err, res) => {
                if(err) {
                    return err;
                } else {
                }
            })
            let redirect = {redirect: '/'}
            res.send(redirect);
        }
    })
})

// handles like tweet to database

router.post('/likeTweet', (req, res, next) => {
    let postId = req.body.postId;
    let user = req.body.user;
    let retweets = user.retweets;
    let likedTweets = user.likedTweets;
    async.series(
        {
            findTweet: function(callback) {
                Tweet.findById(postId)
                .exec(callback)
            }
        }, function(err, results) {
            if(err) { return next(err); }
            likedTweets.push(results.findTweet);
            let userUpdated = new User({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                _id: user._id,
                password: user.password,
                retweets: retweets,
                likedTweets: likedTweets,
                bookmarks: user.bookmarks,
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
        }
    )

})

// handle unlike tweet 
router.post('/unlikeTweet', (req, res, next) => {
    const user = req.body.user;
    const postId = req.body.postId;
    // array of user liked tweets to be updated
    let likedUpdate = user.likedTweets;
    // run the filter array method and pass in rule to return tweets that are not equal to postId
    let newArr = likedUpdate.filter(liked => liked._id !== postId);

    // create new user object passing in our new data and same id to update user in db
    let userUpdated = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        _id: user._id,
        password: user.password,
        retweets: user.retweets,
        likedTweets: newArr,
        bookmarks: user.bookmarks,
        location: user.location,
        birthdate: user.birthdate,
        hyperlinK: user.hyperlink
    })

    // update user with our user object created and redirect back to homepage
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
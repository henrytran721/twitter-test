const express = require('express');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const async = require('async');
const router = express.Router();

router.post('/getuser', (req, res, next) => {
    User.findById(req.body.id, (err, response) => {
        if(err) {
            return next(err);
        } else {
            res.send(response);
        }
    })
})

router.post('/', async (req, res, next) => {
    let userid = req.body.userid;
    // get all tweets
    const tweets = await Tweet.find({})
                                .select('image username tweet userRetweeted date')
                                .populate('username userRetweeted');
    // get all users
    const allUsers = await User.find({})
                                .select('username first_name last_name');
    // get current
    const user = await User.findById(userid)
    res.send({tweets: tweets, user: user, allUsers: allUsers})
    })

router.post('/queryprofile', async (req, res) => {
    let userid = req.body.userid;
    let loggedId = req.body.loggedInId;
    const tweets = await Tweet.find({})
                                .select('image username tweet userRetweeted date')
                                .populate('username userRetweeted');
    
    const user = await User.findById(userid);
    const logged = await User.findById(loggedId);

    res.send({tweets: tweets, user: user, logged: logged})
    })

router.post('/userprofile', (req, res, next) => {
    const user = req.body.user;
    let userUpdated = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        _id: user._id,
        password: user.password,
        retweets: user.retweets,
        likedTweets: user.likedTweets,
        bookmarks: user.bookmarks,
        location: req.body.location,
        birthdate: req.body.birthdate,
        hyperlink: req.body.hyperlink
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

router.post('/fetchTweet', (req, res, next) => {
    const userid = req.body.userid;
    async.parallel({
        tweets: function(callback) {
            Tweet.find({})
            .select('image username tweet userRetweeted date')
            .populate('username userRetweeted')
            .exec(callback)
        },
        user: function(callback) {
            User.findById(userid)
                .exec(callback)
        }
    }, (err, response) => {
        res.send({tweet: response.tweets, user: response.user});
    })
})

module.exports = router;
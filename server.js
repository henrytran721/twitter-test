const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config();
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const async = require('async');
const moment = require('moment');
const passwordValidator = require('password-validator');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var sanitizer = require('sanitize')();
const multer = require('multer');
var AWS = require('aws-sdk');

var storage = multer.memoryStorage();
var upload = multer({storage: storage});

// Define Global Variables
const app = express();


// Step 2
const dev_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gevd4.azure.mongodb.net/twitter?retryWrites=true&w=majority`;
const mongoDb = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// db schema
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

const Tweet = mongoose.model(
    'Tweet', {
        tweet: {type: String, required: true, min: 1},
        image: {type: String, min :1},
        username: {type: Schema.Types.ObjectId, ref: 'User'},
        date: {type: Date, default: Date.now()},
        userRetweeted: {type: Schema.Types.ObjectId, ref: 'User'},
    }
)

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, {msg: 'Incorrect username'});
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    return done(null, user);
                } else {
                    return done(null, false, {msg: 'Incorrect Password'});
                }
            })
        })
    })
)

passport.serializeUser(function(user, done) {
    console.log('SerializeUser function called.');
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

// Configuration
app.use(cors({
    origin: 'http://henri-twitter-test.herokuapp.com/',
    // origin: "http://localhost:3000",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "dole-whip", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(("uploads")));
// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.post('/signup', (req, res, next) => {

    // validate our password to have these critieria 

    var schema = new passwordValidator();
    schema
        .is().min(6)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()   
    
    // returns true or false
    let passwordvalidation = schema.validate(req.body.password);
    
    // if password returns true run the following function
    if(passwordvalidation) {
    // use bcrypt to hash our req.body.password into hashed parameter
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
        if(err) {
            return next(err);
        } else {
            // create a user object and pass in our data
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashed
            })
            // if user is found then send an error to client, else save the user
            User.findOne({username: req.body.username}, (err, example) => {
                if(err) {console.log(err)};
                if(example) {
                    res.json(example);
                } else {
                    // send our data to the database
                    user.save((err) => {
                        if(err) {
                            return next(err); 
                        } else {
                            let redirect = { redirect: '/' }
                            res.json(redirect)
                        }
                    })
                }
        });
        }
    })} else {
        let password_error = {password_error: 'Your password must have an uppercase letter, lowercase letter, and number' };
        res.json(password_error);
    }
})

app.post('/login', passport.authenticate('local'), (req, res, next) => {
    // call req.login for callback is needed in order to call serialize and deserialize functions
    req.session.user = req.user;
    sesh = req.session;
    res.json(req.user);
})

app.post('/getuser', (req, res, next) => {
    User.findById(req.body.id, (err, response) => {
        if(err) {
            return next(err);
        } else {
            res.send(response);
        }
    })
})

app.post('/', (req, res, next) => {
    let userid = req.body.userid;
    async.parallel({
        tweets: function(callback) {
            Tweet.find({})
            .select('image username tweet userRetweeted date')
            .populate('username userRetweeted')
            .exec(callback)
        },
        allUsers: function(callback) {
            User.find({})
            .select('username first_name last_name')
            .exec(callback)
        },
        user: function(callback) {
            User.findById(userid)
                .exec(callback)
        }
    }, function(err, results) {
        res.send({tweets: results.tweets, user: results.user, allUsers: results.allUsers})
    })
})

app.post('/queryprofile', (req, res, next) => {
    let userid = req.body.userid;
    let logged = req.body.loggedInId;
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
        },
        logged: function(callback) {
            User.findById(logged)
            .exec(callback)
        }
    }, function(err, results) {
        res.send({tweets: results.tweets, user: results.user, logged: results.logged})
    })
})


app.get('/bookmarks/:id', (req, res, next) => {
    let id = req.params.id;
    let user = {};
    User.findById(id, (err, response) => {
        user = response;
        res.send(user);
    })
    
})

// tweet endpoint creates a new tweet object from mongoose model and pushes to db
app.post('/tweet', upload.single('image'), (req, res, next) => {
        const file = req.file;
        const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
        const user = req.body.username;
        const tweetText = req.body.tweet;
        let s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        if(req.file) {

        var params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read"
        };
        s3bucket.upload(params, function(err, data) {
            if(err) {
                res.status(500).json({error: true, Message: err});
            } else {
                var newFileUploaded = {
                    fileLink: s3FileURL + file.originalname,
                    s3_key: params.Key
                }
                User.findById(req.body.username, (err, response) => {
                    if(err) {
                        return next(err);
                    } else {
                        const tweet = new Tweet(
                            {
                                tweet: tweetText,
                                image: newFileUploaded.fileLink,
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
    } else {
        User.findById(req.body.username, (err, response) => {
            if(err) {
                return next(err);
            } else {
                const tweet = new Tweet(
                    {
                        tweet: tweetText,
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

app.post('/retweet', (req, res, next) => {
    let postId = req.body.postid;
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
                    //console.log(res);
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

app.post('/unretweet', (req, res, next) => {
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
                    //console.log(res);
                }
            })
            let redirect = {redirect: '/'}
            res.send(redirect);
        }
    })
})

app.post('/likeTweet', (req, res, next) => {
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
            console.log(likedTweets);
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

app.post('/unlikeTweet', (req, res, next) => {
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

app.post('/bookmark', (req, res, next) => {
    // console.log(req.body.postid);
    // console.log(req.body.user);
    const postid = req.body.postid;
    const user = req.body.user;
    
    async.series({
        tweet: function(callback) {
            Tweet.findById(postid)
                .populate('userRetweeted username')
                .exec(callback)
        }
    }, function(err, response) {
        let bookArr = user.bookmarks;
        bookArr.push(response.tweet);
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

app.post('/unbookmark', (req, res, next) => {
        const postid = req.body.postid;
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

app.post('/userprofile', (req, res, next) => {
    console.log(req.body.location, req.body.birthdate, req.body.hyperlink, req.body.user);
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

app.post('/fetchTweet', (req, res, next) => {
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

app.listen(process.env.PORT || 9000, () => {
    console.log(`Server is running on port ` + process.env.PORT);
})
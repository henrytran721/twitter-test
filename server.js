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
const User = require('./models/User');
const Tweet = require('./models/Tweet.js');

// import route
const index = require('./routes/index');
const tweet = require('./routes/tweet');
const bookmark = require('./routes/bookmark');

// Define Global Variables
const app = express();

// Step 2
const dev_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gevd4.azure.mongodb.net/twitter?retryWrites=true&w=majority`;
const mongoDb = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

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
    origin: 'https://henri-twitter-test.herokuapp.com/',
    // origin: "http://localhost:3000",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "dole-whip", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/tweet', tweet);
app.use('/bookmark', bookmark)

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

app.listen(process.env.PORT || 9000, () => {
    console.log(`Server is running on port ` + process.env.PORT);
})
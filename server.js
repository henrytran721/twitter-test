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

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
const dev_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gevd4.azure.mongodb.net/twitter?retryWrites=true&w=majority`;
const mongoDb = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log('hello');

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});
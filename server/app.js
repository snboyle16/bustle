// ----IMPORTS----
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require("firebase-admin");

// ----ADMIN CONFIG----
var serviceAccount = require("./config/firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bustle-31c86.firebaseio.com"
});

// ----APP CONFIG----
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----MODULES----
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var activityRouter = require('./routes/activity');

// ----ROUTING----
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/activity', activityRouter);

module.exports = app;

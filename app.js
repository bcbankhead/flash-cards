var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

var routes = require('./routes/index');
var users = require('./routes/users');
var authRoutes = require('./routes/auth');

var session = require('cookie-session');
require('dotenv').load()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(cookieSession({
//   name: 'session',
//   keys: [key1, key2, key3]
// }))

app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2]
}))

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {id: profile.id, displayName: profile.displayName, token: accessToken})
  }
));
//http://localhost:3000/auth/slack/callback

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use('/', routes);
app.use('/', authRoutes);
app.use('/users', users);

app.use(function (req, res, next){
  if(req.isAuthenticated()) {
    unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function (response) {
        console.log(req.user.id);
        functions.writeData(linkedUsers,req.user,function(records){
          console.log(records);
        })
        res.render('cards/show', { profile: response.body });
      })
  } else {
    res.render('index', { message: "notLoggedIn" });
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

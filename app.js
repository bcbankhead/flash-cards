var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var authRoutes = require('./routes/auth');
var users = require('./routes/users');

var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy

var session = require('cookie-session');
require('dotenv').load()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

passport.use(new SlackStrategy({
   clientID: process.env.SLACK_CLIENT_ID,
   clientSecret: process.env.SLACK_CLIENT_SECRET,
   callbackURL: process.env.CALLBACK_URL
 },
//  function(accessToken, refreshToken, profile, done) {
//    User.findOrCreate({ SlackId: profile.id }, function (err, user) {
//        , function (err, user) {
//      return done(err, user);
//    });
//  }
// ));

  function(accessToken, refreshToken, profile, done) {
    done(null, { SlackId: profile.id })
  }
));

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

app.get('/auth/slack',
    passport.authorize('slack'));

app.get('/auth/slack/callback',
  passport.authorize('slack', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.render('dummy');
  });

// app.use(function (req,res,next) {
//   if(req.isAuthenticated()){
//     console.log(req.isAuthenticated());
//     next()
//   } else {
//     console.log("not Authed");
//     res.redirect('/auth/slack');
//   }
// })

app.use('/', routes);
app.use('/', authRoutes);
app.use('/users', users);


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

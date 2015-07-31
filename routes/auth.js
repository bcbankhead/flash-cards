var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/slack', passport.authenticate('slack'));

router.get('/logout', function (req, res, next) {
  req.session = null
  res.redirect('/')
});

router.get('/auth/slack/callback',
  passport.authenticate('slack', {
    failureRedirect: '/fail',
    successRedirect: '/'
  }));

module.exports = router;

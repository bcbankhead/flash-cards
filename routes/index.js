var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', passport.authenticate('slack', { failureRedirect : '/auth/slack/callback'}), function(req, res, next) {
  console.log(req.cookies.user);
  res.render('index', {title: 'title'});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var categoryCollection = db.get('categories');
var questionCollection = db.get('questions');
var userAnswerCollection = db.get('userAnswers');
var functions = require('../lib/serverside.js');
var unirest = require('unirest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next){
  unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-urls::(original),firstName)?format=json')
    .header('Authorization', 'Bearer ' + req.user.token)
    .header('x-li-format', 'json')
    .end(function (response) {
      userAnswerCollection.find({userId: req.user.id}, function(err, userAnswers){
        questionCollection.find({userId: req.user.id}, function (err, questionsSubmitted) {
          var totalScore = functions.totalScore(userAnswers);
          var questionsAnswered = userAnswers.length
          res.render('users/show', {profile: response.body, totalScore: totalScore, questionsAnswered: questionsAnswered, questionsSubmitted: questionsSubmitted})
        })

      })
    })
})

module.exports = router;

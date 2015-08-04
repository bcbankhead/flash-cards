var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var categoryCollection = db.get('categories');
var questionCollection = db.get('questions');
var userAnswerCollection = db.get('userAnswers');

var functions = require('../lib/serverside.js');

router.get('/', function(req, res, next) {
  categoryCollection.find({}, function(err, data){
    res.render('cards/index', {data: data});
  })
});

router.get('/new', function(req, res, next){
  res.render('cards/new');
})

router.post('/new', function(req, res, next){
  var errors = functions.validateNewCategory(req.body.categoryName, req.body.categoryIcon)
  if(errors.length === 0){
    categoryCollection.insert({
      name: req.body.categoryName,
      icon: req.body.categoryIcon
    }, function(err, data){
      res.redirect('/cards/' + data._id + '/show')
    })
  } else {
    res.render('cards/new', {errors: errors, categoryName: req.body.categoryName, categoryIcon: req.body.categoryIcon})
  }
})

router.get('/:id/show', function(req, res, next) {
  categoryCollection.findOne({_id: req.params.id}, function(err, category){
    questionCollection.find({categoryId: req.params.id}, function(err, questions){
      res.render('cards/show', {category: category, questions: questions});
    })
  })
});

router.get('/:id/questions/new', function(req, res, next){
  res.render('cards/questions/new', {categoryId: req.params.id})
})

router.post('/:id/questions/new', function(req, res, next){
  res.render('cards/questions/new', { categoryId: req.params.id, questionType: req.body.questionType})
})

router.post('/questions/:id/openEnded', function(req, res, next){
  questionCollection.insert({
    categoryId: req.params.id,
    // userId: cookie
    questionType: 'openEnded',
    question: req.body.question,
    answer: req.body.answer
  }, function(err, data){
    res.redirect('/cards/' + req.params.id + '/show')
  })
})

router.post('/questions/:id/multipleChoice', function(req, res, next){
  var errors = functions.validateNewQuestion(
    req.body.question,
    req.body.correctAnswer,
    req.body.explanation,
    req.body.incorrectOne,
    req.body.incorrectTwo,
    req.body.incorrectThree)
  if(errors.length === 0){
    questionCollection.insert({
      categoryId: req.params.id,
      //userId: cookie
      questionType: 'multipleChoice',
      question: req.body.question,
      correctAnswer: req.body.correctAnswer,
      explanation: req.body.explanation,
      incorrectAnswers: [ req.body.incorrectOne,
                          req.body.incorrectTwo,
                          req.body.incorrectThree ]
    }, function(err, data){
      res.redirect('/cards/' + req.params.id + '/show');
    })
  } else {
    res.render('cards/questions/new', {
      errors: errors,
      categoryId: req.params.id,
      question: req.body.question,
      correctAnswer: req.body.correctAnswer,
      explanation: req.body.explanation,
      incorrectOne: req.body.incorrectOne,
      incorrectTwo: req.body.incorrectTwo,
      incorrectThree: req.body.incorrectThree})
  }
});

router.post('/questions/:id/codeSpecific', function(req, res, next){
  questionCollection.insert({
    categoryId: req.params.id,
    //userId: cookie
    questionType: 'codeSpecific',
    question: req.body.question,
    correctAnswer: req.body.correctAnswer,
    explanation: req.body.explanation,
  }, function(err, data){
    res.redirect('/cards/' + req.params.id + '/show');
  })
})

router.post('/submit/:redirect', function (req, res, next) {
  console.log(req.body);
  userAnswerCollection.insert({
    userId: req.user.id,
    questionId: req.body.questionID,
    categoryId: req.body.categoryID,
    answerPoints: req.body.points,
    userAnswer: req.body.userAnswer,
  }, function(err, data){
    if (req.params.redirect === 'goToCategories'){
      res.redirect("/cards");
    } else {
      res.redirect("/cards/"+ req.body.categoryID+"/show");
    }
  })
})

module.exports = router;

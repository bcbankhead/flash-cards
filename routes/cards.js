var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI)
var categoryCollection = db.get('categories')

router.get('/', function(req, res, next) {
  res.render('cards/index', { title: 'Express' });
});

router.get('/new', function(req, res, next){
  res.render('cards/new');
})

router.post('/new', function(req, res, next){
  categoryCollection.insert({
    name: req.body.categoryName,
    icon: req.body.categoryIcon
  }, function(err, data){
    res.redirect('/cards/' + data._id + '/show')
  })
})

router.get('/:id/show', function(req, res, next) {
  categoryCollection.findOne({_id: req.params.id}, function(err, category){
    res.render('cards/show', {category: category});
  })
});

router.get('/:id/questions/new', function(req, res, next){
  res.render('cards/questions/new', {categoryId: req.params.id})
})

router.post('/:id/questions/new', function(req, res, next){
  res.render('cards/questions/new', { categoryId: req.params.id, questionType: req.body.questionType})
})

module.exports = router;
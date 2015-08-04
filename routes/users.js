var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next){
  res.render('users/show', {})
});

router.get('/:id/edit', function(req, res, next){
  res.render('users/edit', {})
})
module.exports = router;

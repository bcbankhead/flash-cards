var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var monk = require('monk')(process.env.MONGOLAB_URI)
var linkedUsers = monk.get('users')
var functions = require('../lib/serverside.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function (response) {
        console.log(req.user.id);
        functions.writeData(linkedUsers,req.user,function(records){
          console.log(records);
        })
        res.redirect('/cards');
      })
  } else {
    res.render('index', {  });
  }
});

module.exports = router;

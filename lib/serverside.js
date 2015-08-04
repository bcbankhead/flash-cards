var unirest = require('unirest');
var monk = require('monk')(process.env.MONGOLAB_URI);

module.exports = {

  writeData: function(collection,name,callback){
    if(name){
      var user = name.displayName;
    collection.update({ user : user },
                      { user : user },
                      { upsert: true});
      //{ profile: profile },
      //{ upsert: true });
      callback('done');
    }
  },
  validateNewCategory: function(name, url){
   var errorArray = [];
   if(name === ""){
     errorArray.push('Please choose a name for this category.');
   }
   if(url === ""){
     errorArray.push('Please add a URL for the category icon.');
   }
   return errorArray;
 },

 validateNewQuestion: function(question, correctAnswer, explanation, incorrectOne, incorrectTwo, incorrectThree){
   var errorArray = [];
   if(question === ""){
     errorArray.push('Please enter a question.');
   }
   if(correctAnswer === ""){
     errorArray.push('Please enter a correct answer.');
   }
   if(explanation === ""){
     errorArray.push('Please enter an explanation.');
   }
   if(incorrectOne === "" || incorrectTwo === "" || incorrectThree === ""){
     errorArray.push('Please enter three incorrect answers.');
   }
   return errorArray;
 },

 ifAnswered: function(userAnswers, questions, callback){
   for (var i = 0; i < userAnswers.length; i++) {
     for (var j = 0; j < questions.length; j++) {
       if(questions[j]._id.toString() === userAnswers[i].questionId.toString()){
          questions[j].answered = true;
       }
     }
   }
   callback(questions)
 },

 totalScore: function(userAnswers){
   var total = 0;
   for (var i = 0; i < userAnswers.length; i++) {
     total += Number(userAnswers[i].answerPoints)
   }
   return total 
 }

};

$("form").submit(function() {
    $(this).submit(function() {
        return false;
    });
    return true;
});

var questionObject;

function overlay(question) {
  if (question) {
    questionObject = question;
    var questionDiv = document.getElementsByClassName('overlayQuestion')
    questionDiv[0].innerHTML = question.question;
    if (question.questionType = "multipleChoice") {
      var answerDiv = document.getElementsByClassName('overlayAnswer')

      var answerArray = question.incorrectAnswers;
      answerArray.splice(Math.floor(Math.random() * answerArray.length-1),0,question.correctAnswer);

        answerArray.forEach(function (e,i,a) {
          var input = document.createElement('input');
          var p = document.createElement('p')
          var label = document.createElement('label')
          input.type = 'radio';
          input.value = answerArray[i];
          input.name = 'selectedAnswer'
          input.id = e;
          label.htmlFor = e;
          label.innerHTML = e;
          p.appendChild(input);
          p.appendChild(label);
          answerDiv[0].appendChild(p);

        });
      }
    }
    modal = document.getElementById("overlay");
    modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";
 }

document.getElementById('submitAnswer').addEventListener('click', function() {
  var answers = document.getElementsByTagName('input')
  var correctAnswer = questionObject.correctAnswer;
  var cardBack = document.getElementsByClassName('back')[0];
  [].forEach.call(answers, function (e,i,a) {
    if(e.checked) {
      if(e.value === correctAnswer){
        var result = document.getElementsByClassName('result')[0];
        result.innerHTML = 'Correct!'
        var points = document.getElementsByClassName('points')[0];
        points.innerHTML = 'You earned 1 point!'
        var userPointChallengeRedirect = document.getElementById('userPointChallengeRedirect')
        userPointChallengeRedirect.value = 1;
        var userAnswerChallengeRedirect = document.getElementById('userAnswerChallengeRedirect')
        userAnswerChallengeRedirect.value = e.value;
        var userPointsCategoriesRedirect = document.getElementById('userPointsCategoriesRedirect')
        userPointsCategoriesRedirect.value = 1;
        var userAnswerCategoryRedirect = document.getElementById('userAnswerCategoryRedirect')
        userAnswerCategoryRedirect.value = e.value
        var questionIDCategoryRedirect = document.getElementById('questionIDCategoryRedirect')
        questionIDCategoryRedirect.value = questionObject._id
        var questionIDChallengeRedirect = document.getElementById('questionIDChallengeRedirect')
        questionIDChallengeRedirect.value = questionObject._id;
        cardBack.className = cardBack.className + " correct"
        $(".overlaySegment").flip(true);
      } else {
        var result = document.getElementsByClassName('result')[0];
        result.innerHTML = 'Incorrect!'
        var points = document.getElementsByClassName('points')[0];
        points.innerHTML = 'The correct answer is '+correctAnswer
        var userPointChallengeRedirect = document.getElementById('userPointChallengeRedirect')
        userPointChallengeRedirect.value = 0;
        var userAnswerChallengeRedirect = document.getElementById('userAnswerChallengeRedirect')
        userAnswerChallengeRedirect.value = e.value;
        var userPointsCategoriesRedirect = document.getElementById('userPointsCategoriesRedirect')
        userPointsCategoriesRedirect.value = 0;
        var userAnswerCategoryRedirect = document.getElementById('userAnswerCategoryRedirect')
        userAnswerCategoryRedirect.value = e.value;
        var questionIDChallengeRedirect = document.getElementById('questionIDChallengeRedirect')
        questionIDChallengeRedirect.value = questionObject._id;
        var questionIDCategoryRedirect = document.getElementById('questionIDCategoryRedirect')
        questionIDCategoryRedirect.value = questionObject._id
        cardBack.className = cardBack.className + " wrong"
        $(".overlaySegment").flip(true);
      }
    }
  });
  var isAnswered =0;
  for(var i =0; i < 4; i++){
    if(answers[i].checked){
       isAnswered += 1;
    } else {
      isAnswered += 0;
    }
    var notAnswered = document.getElementById('notAnswered')
    if(isAnswered == 0){
      notAnswered.style.display = 'inline-block'
      notAnswered.addEventListener('click', function () {
        notAnswered.style.display = 'none'
      })
    }
  }
});

// document.getElementById('loginCard').addEventListener('mouseover', function() {
// $("#loginCard").flip(true);
// }

// setInterval(function () {
//   $("#loginCard").flip(true);
// },500);

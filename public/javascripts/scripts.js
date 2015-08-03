
function overlay(question) {
  if (question) {
    var questionDiv = document.getElementsByClassName('overlayQuestion')
    questionDiv[0].innerHTML = question.question;
    if (question.questionType = "multipleChoice") {
      var answerDiv = document.getElementsByClassName('overlayAnswer')
      var input = document.createElement('input');
      input.type = 'radio';
      var answerArray = question.incorrectAnswers
      answerArray.splice(Math.floor(Math.random()*answerArray.length-1),1,question.correctAnswer)
      //alert(answerArray);
    }
  }
    modal = document.getElementById("overlay");
    modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";
 }

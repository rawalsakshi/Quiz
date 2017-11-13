function startQuiz(){
  document.getElementById("quiz").innerHTML=`<div id="startPage">
    <h2>Ready for Fun Quiz!!</h2>
    <h2 style="padding-top: 2vh">Click on button to start Quiz</h2>
    <button id="mainButton" onclick="QuizStarted()" style="margin-top:12vh">Start Quiz</button>
    <p id="note">Note: Quiz contains 15 questions.</p>
    <p id="note"> &nbsp; &nbsp; &nbsp; Quiz Timmmings : 2 mins</p>
  </div>`;
  document.getElementById("previous").style.display = "none";
  document.getElementById("next").style.display = "none";
  document.getElementById("submit").style.display = "none";
  document.getElementById("reset").style.display = "none";
}
   
function QuizStarted(){
  function getData(callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://raw.githubusercontent.com/rawalsakshi/assignment/master/quizdata.json", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var myQuestions = JSON.parse(this.response);
        callback(this, [myQuestions])  ;
      }
    };  
  }

  getData(function(data){
    myQuestions = JSON.parse(data.response);
    var quizContainer = document.getElementById("quiz"),
        submitButton = document.getElementById("submit"),
        previousButton = document.getElementById("previous"),
        nextButton = document.getElementById("next"),
        resetButton = document.getElementById("reset"),
        currentSlide = 0;

    function buildQuiz() {
      var output = [];
      
      myQuestions.forEach((currentQuestion, questionNumber) => {
        var answers = [];

        for (letter in currentQuestion.answers) {
          answers.push(
            `<div>
              <label class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" name="question${questionNumber}" value="${letter}">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">
                ${currentQuestion.answers[letter]}</span>
              </label>
            </div>`
          );
        }

        output.push(
          `<div class="slide">
             <div class="question"> ${questionNumber+1}. ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });

      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      var answerContainers = quizContainer.querySelectorAll(".answers"),
          numCorrect = 0;

      myQuestions.forEach((currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber],
            selector = `input[name=question${questionNumber}]:checked`,
            userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
        } 
      });

      if(numCorrect<7){
        quizContainer.innerHTML = `<div id="resultDisplay">
          <div class="card" style="width: 30rem; height:15rem">
            <div class="card-header">
              <h2>Result</h2>
            </div>
            <div class="card-body">
              <p class="card-text" style="color:white"><font size="5">You have scored ${numCorrect} out of ${myQuestions.length}</p>
            </div>
          </div>
          <br>
          <h2 style="color:#47696b">Better Luck Next Time!!!!!</h2>
        <div>`;
      }else{
        quizContainer.innerHTML = `<div id="resultDisplay">
          <div class="card" style="width: 30rem; height:15rem">
            <div class="card-header">
              <h3>Result</h3>
            </div>
            <div class="card-body">
              <p class="card-text">You have scored ${numCorrect} out of ${myQuestions.length}</p>
            </div>
            </div>
            <br>
            <h2>Well Done!!!!!</h2>
        <div>`;
      }

      previousButton.style.display = "none";
      nextButton.style.display="none";
      submitButton.style.display = "none";
      resetButton.style.display = "none";
      document.getElementById("mainquizHeading").style.color="#465d63";
    }

    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
    
      if(currentSlide === 0){
        previousButton.style.display = "none";
      }else{
        previousButton.style.display = "inline-block";
      }
    
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      }else{
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
      
      resetButton.style.display="inline-block";
      resetRadioButton(currentSlide);
    }

    function showNextSlide() {
      showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }


    function resetRadioButton(n){
      resetButton.onclick=function(){
        var name="question"+n,
            ele = document.getElementsByName(name);

        for(var i=0;i<ele.length;i++){
          ele[i].checked = false;
        }
      }
    }

    buildQuiz();

    var slides = document.querySelectorAll(".slide");

    showSlide(0);

    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    document.getElementById("quizHeading").innerHTML=2 + ":" + 00;
    document.getElementById("mainquizHeading").innerHTML = `Time left= ${document.getElementById("quizHeading").innerHTML}`;

    startTimer();

    function startTimer(myVar) {
      myVar=setTimeout(startTimer, 1000);
      var presentTime = document.getElementById("quizHeading").innerHTML,
          timeArray = presentTime.split(/[:]+/),
          m = timeArray[0],
          s = checkSecond((timeArray[1] - 1));
      
      if(s==59){
        m=m-1;
      }if(m<0){
        clearTimeout(myVar);
        showResults()
      } 

      document.getElementById('quizHeading').innerHTML = m + ":" + s;
      document.getElementById("mainquizHeading").innerHTML = `Time left= ${document.getElementById("quizHeading").innerHTML}`;
    }

  function checkSecond(sec) {
    if(sec < 10 && sec >= 0){
      sec = "0" + sec;
    }if(sec < 0){
      sec = "59";
    }
    return sec;
  }

  });           
}

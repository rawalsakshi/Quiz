(function(APP) {

    APP.Controller = new function() {

        quizHeading.value = 2 + ":" + 00;

        this.startQuiz = function() {
            quizContainer.innerHTML = APP.View.getStartPageTemplate();
            buttons.style.display = "none";
        }

        this.calculateResult = function() {

            var answerContainers = quizContainer.querySelectorAll(".answers"),
                numCorrectAns = 0;

            APP.Model.myQuestions.forEach((currentQuestion, questionNumber) => {

            var answerContainer = answerContainers[questionNumber],
                selectedOptions = answerContainer.querySelectorAll(`input[name=question${questionNumber}]:checked`),
                userAnswer = [];

            for (var x = 0 ; x < selectedOptions.length ;  x++) {
                userAnswer.push(selectedOptions[x].value);
            }

            if (userAnswer.toString() == currentQuestion.correctAnswer.toString()) {
                numCorrectAns++;
            } 

            });

            quizContainer.innerHTML = APP.View.getResultTemplate(numCorrectAns);
            buttons.style.display = "none";
            mainquizHeading.style.color="#465d63";
        }

        this.showQuestionPages = function(n) {

            APP.slides[currentSlide].classList.remove("active-slide");
            APP.slides[n].classList.add("active-slide");
            currentSlide = n;
        
            if (currentSlide === 0) {
                previousButton.style.display = "none";
            } else {
                previousButton.style.display = "inline-block";
            }
        
            if (currentSlide === APP.slides.length - 1) {
                nextButton.style.display = "none";
                submitButton.style.display = "inline-block";
            } else {
                nextButton.style.display = "inline-block";
                submitButton.style.display = "none";
            }

            buttons.style.display = "inline-block";
            resetButton.style.display="inline-block";
            APP.Controller.resetRadioButton(currentSlide);
        }

        this.resetRadioButton = function(quesId) {
            resetButton.onclick = function() {
                var name="question"+quesId,
                    elem = document.getElementsByName(name);

                for (var i=0;i<elem.length;i++) {
                    elem[i].checked = false;
                }
            }
        }


        this.startTimer = function(myVar) {
            APP.Controller.myVar = setTimeout(APP.Controller.startTimer, 1000);

            var presentTime = quizHeading.value,
                timeArray = presentTime.split(/[:]+/),
                minutes = timeArray[0],
                second = APP.Controller.checkSecond((timeArray[1] - 1));
          
                if (second == 59) {
                    minutes=minutes-1;
                } if(minutes < 0) {
                    clearTimeout(myVar);
                    APP.Controller.calculateResult();
                } 

            quizHeading.value = minutes + ":" + second;
            mainquizHeading.innerHTML = `Time left= ${quizHeading.value}`;
        }

        this.checkSecond = function(sec) {
            if (sec < 10 && sec >= 0) {
                sec = "0" + sec;
            } if (sec < 0) {
                sec = "59";
            }
            return sec;
        }

        this.showNextPage = function() {
            APP.Controller.showQuestionPages(currentSlide + 1);
        }

        this.showPreviousPage = function() {
            APP.Controller.showQuestionPages(currentSlide - 1);
        } 

        this.eventListener = function() {
            submitButton.addEventListener("click", APP.Controller.calculateResult);
            previousButton.addEventListener("click",APP.Controller.showPreviousPage);
            nextButton.addEventListener("click", APP.Controller.showNextPage);
        }
    }

})(window.APP = window.APP || {});
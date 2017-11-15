const quizContainer = document.getElementById("quiz"),
	  buttons = document.getElementById("buttons")
	  submitButton = document.getElementById("submit"),
	  previousButton = document.getElementById("previous"),
	  nextButton = document.getElementById("next"),
	  resetButton = document.getElementById("reset"),
	  quizHeading = document.getElementById("quizHeading"),
	  mainquizHeading = document.getElementById("mainquizHeading")
	  currentSlide = 0;

(function(APP) {	

	APP.init = function() {

		APP.Model.getJsonData(function(data) {

			APP.Model.myQuestions =JSON.parse(data.response); 

			APP.Model.getQuizData(APP.Model.myQuestions);

			APP.slides = document.querySelectorAll(".slide");

		    APP.Controller.showQuestionPages(0);

		    APP.Controller.eventListener();
		    
		    APP.Controller.startTimer();   

	    }); 
	}
	
})(window.APP = window.APP || {});

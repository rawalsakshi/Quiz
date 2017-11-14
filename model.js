(function(APP) {

	APP.Model = new function() {

	  	this.getJsonData = function(callback) {
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

		this.getQuizData = function(myQuestions) {
			var output = [];     
			myQuestions.forEach((currentQuestion, questionNumber) => {
		    	var answers = [];

		    	for (letter in currentQuestion.answers) {
		       		answers.push(ans=APP.View.getAnswersTemplate(questionNumber,letter,currentQuestion.answers[letter]));
		    	}

		    	output.push(ques=APP.View.getQuesTemplate(questionNumber,currentQuestion.question,answers));
			});

		    quizContainer.innerHTML = output.join("");
		}
    }

})(window.APP = window.APP || {});
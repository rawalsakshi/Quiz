(function(APP) {

    APP.View = new function() {

	  	this.getStartPageTemplate = function() { 
	  		const startPageTemplate = `<div id="startPage">
				<h2>Ready for Fun Quiz!!</h2>
			    <h2 style="padding-top: 2vh">Click on button to start Quiz</h2>
			    <button id="mainButton" onclick="APP.init()" style="margin-top:12vh">Start Quiz</button>
			    <p id="note">Note: Quiz contains 15 questions.</p>
			    <p id="note"> &nbsp; &nbsp; &nbsp; Quiz Timmmings : 2 mins</p>
			</div>`;

			return startPageTemplate;
		}

	    this.getResultTemplate = function(numCorrectAns) {
	    	const resultTemplate = `<div id="resultDisplay">
	        	<div class="card" style="width: 30rem; height:15rem">
	            	<div class="card-header">
	              		<h2>Result</h2>
	            	</div>
	            	<div class="card-body">
	            		<p class="card-text" style="color:white"><font size="5">You have scored ${numCorrectAns} out of ${APP.Model.myQuestions.length}</p>
	            	</div>
	          	</div>
	          	<br>
	          	<h2 style="color:#47696b">Try Again!!!!!</h2>
	        <div>`;

	        return resultTemplate;
	    }

	    this.getAnswersTemplate = function(questionNumber,letter,currentQuestionAnswer) {
	    	if(questionNumber<4) {
            	const ansTemplate = `<div>
		            <label class="custom-control custom-checkbox">
		                <input type="checkbox" class="custom-control-input" name="question${questionNumber}" value="${letter}">
		                	<span class="custom-control-indicator"></span>
		                	<span class="custom-control-description">
		                	${currentQuestionAnswer}</span>
		            </label>
		        </div>`;
				
		        return ansTemplate;  

			} else {
	            const ansTemplate = `<div>
	              	<label class="custom-control custom-radio">
	                	<input type="radio" class="custom-control-input" name="question${questionNumber}" value="${letter}">
	                		<span class="custom-control-indicator"></span>
	                		<span class="custom-control-description">
	                		${currentQuestionAnswer}</span>
	              	</label>
	            </div>`;

	            return ansTemplate;  
    		}
	    }

	    this.getQuesTemplate = function(questionNumber,currentQuestion,answers){
	      	const quesTemplate = `<div class="slide">
	       		  <div class="question"> ${questionNumber+1}. ${currentQuestion} </div>
	        	  <div class="answers"> ${answers.join("")} </div>
	      	</div>`;
	      	
	      	return quesTemplate;
	    }
  	}
	
})(window.APP = window.APP || {});

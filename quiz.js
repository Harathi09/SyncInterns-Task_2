const quiz = [
  {
    q: 'Which programming language is commonly used for adding interactivity to web pages?',
    options: ['HTML', 'CSS', 'Javascript', 'Python'],
    answer: 2
  },
  {
    q: 'Which CSS property is used to control the spacing between elements?',
    options: ['margin', 'padding', 'border', 'outline'],
    answer: 0
  },
  {
    q: 'What does CSS stand for?',
    options: ['Cascading Style Sheets', 'Creative Styling System', 'Computer Styling System', 'Colorful Style Sheets'],
    answer: 0
  },
  {
    q: 'Which HTTP method is used for submitting data to a server?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    answer: 1
  },
  {
    q: 'Which of the following is NOT a programming language?',
    options: ['Java', 'Ruby', 'Swift', 'Photoshop'],
    answer: 3
  },
  {
    q: 'What does the "href" attribute in an anchor tag define?',
    options: ['Header Reference', 'Hypertext Reference', 'Hyperlink Relationship', 'Hypertext Render'],
    answer: 1
  },
  {
    q: 'Which technology is used for real-time communication between a web browser and a server?',
    options: ['WebSockets', 'REST', 'AJAX', 'FTP'],
    answer: 0
  },
  {
    q: 'What does the "viewport" meta tag control in a web page?',
    options: ['Background color', 'Font styles', 'Website layout', 'Browser compatibility'],
    answer: 2
  },
  {
    q: 'Which CSS property is used to control the order of flex items in a flex container?',
    options: ['align-order', 'order', 'flex-order', 'display-order'],
    answer: 1
  },
  {
    q: 'What does the acronym "URL" stand for?',
    options: ['Universal Remote Locator', 'Uniform Resource Locator', 'Ultimate Resource Link', 'User Referral Link'],
    answer: 1
  }
];

  

  
const questionNumber = document.querySelector(".question-no");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".opt-container");
const answerIndicatorContainer = document.querySelector(".ans-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const name = document.querySelector(".name");

let questionCounter=0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
function setAvailableQuestions(){
	const totalQuestions=quiz.length;
	for(let i=0;i<totalQuestions; i++){
		availableQuestions.push(quiz[i])
	}
}
function getNewQuestion(){
 	questionNumber.innerHTML="Question "+(questionCounter+1)+" of 10";
 	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
 	currentQuestion=questionIndex;
 	questionText.innerHTML=currentQuestion.q;
 	const index1=availableQuestions.indexOf(questionIndex);
 	availableQuestions.splice(index1,1);
 	const optionLen= currentQuestion.options.length;
 	for(let i=0; i<optionLen; i++){
 		availableOptions.push(i)
 	}
  optionsContainer.innerHTML='';
 	let animationDelay = 0.15;
	for(let i=0;i<optionLen; i++){
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		const index2= availableOptions.indexOf(optionIndex);
		availableOptions.splice(index2,1);



		const option = document.createElement("div");
		option.innerHTML=currentQuestion.options[optionIndex];
		option.id=optionIndex;
		option.style.animationDelay = animationDelay+'s';
		animationDelay=animationDelay+0.15;
		option.className="option";
		optionsContainer.appendChild(option);
		option.setAttribute("onclick","getResult(this)");
	}
 	
 	questionCounter++
}

function getResult(element){
	const id = parseInt(element.id);
	
	if (id === currentQuestion.answer){
		
		element.classList.add("correct");
		
		updateAnswerIndicator("correct");
		correctAnswers++;
		console.log("correct:"+correctAnswers)
	}
	else{
		
		element.classList.add("wrong");
		
		updateAnswerIndicator("wrong");


		const optionLen = optionsContainer.children.length;
		for(let i=0; i<optionLen; i++){
			if(parseInt(optionsContainer.children[i].id) === currentQuestion.answer){
				optionsContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}

function unclickableOptions() {
	
	const optionLen = optionsContainer.children.length;
	for(let i=0;i<optionLen; i++){
		optionsContainer.children[i].classList.add("already-answered");
	}
}


function answerIndicator(){
	answerIndicatorContainer.innerHTML = '';
	const totalQuestions = quiz.length;
	for(let i=0; i<10; i++){
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}
function updateAnswerIndicator(markType){
	answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
}


function next(){
	if(questionCounter===10){
		console.log("Quiz Over!");
		quizOver();
	}
	else{
		getNewQuestion();
	}
}


function quizOver(){
	
	quizBox.classList.add("hide");
	
	resultBox.classList.remove("hide");
	quizResult();
}

function quizResult(){
	
	resultBox.querySelector(".tot-question").innerHTML = 10;
	resultBox.querySelector(".tot-attempt").innerHTML =attempt;
	resultBox.querySelector(".tot-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".tot-wrong").innerHTML = attempt- correctAnswers;
	const percentage =  (correctAnswers/10)*100;
	resultBox.querySelector(".tot-percentage").innerHTML = percentage.toFixed(2) + "%";
	resultBox.querySelector(".tot-score").innerHTML = correctAnswers+" / 10";
}

function startQuiz(){
	homeBox.classList.add("hide");
	quizBox.classList.remove("hide" );
  setAvailableQuestions();
	getNewQuestion();
	answerIndicator();
}

function resetQuiz(){
	questionCounter=0;
	correctAnswers = 0;
	attempt = 0;
}
function tryAgainQuiz(){
	resultBox.classList.add("hide");
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();

}
function goToHome(){
	resultBox.classList.add("hide");
	homeBox.classList.remove("hide");
	resetQuiz();
}	
function rEload()
{
	quizBox.classList.add("hide");
  homeBox.classList.remove("hide");
	resetQuiz();
}

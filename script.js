const _question = document.getElementById('question');
const _options = document.getElementById('options'); 
const _totalQuestion = document.getElementById('total-questions');
const _correctQuestion = document.getElementById('correct-questions');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');

let correctAnswer = "", correctScore = 0, askedCount = 0, totalQuestions = 10;

// add event listeners
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

// set instructions and values when page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestions;
    _correctQuestion.textContent = correctScore;
});

// loads question from API
async function loadQuestion() {
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    showQuestion(data.results[0]);
    // console.log(data.results[0]);
    _result.innerHTML = "";
}

// fetches and renders the question via api 
function showQuestion(data) {
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    // console.log(correctAnswer);
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer); // inserting correct answer in random position in the options list
    
    _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;

    selectOption();
}

// options selection
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// answer checking
function checkAnswer() {
    _checkBtn.disabled = true;
    if (_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if (selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// to convert html entities into normal text of correct answer if there are any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

// checks count and prints score
function checkCount() {
    askedCount++;
    setCount();
    if(askedCount == totalQuestions) {
        setTimeout(function(){
        }, 5000);

        _result.innerHTML += `<p> Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 400);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestions;    
    _correctQuestion.textContent = askedCount;
}

// restarts quiz and set values
function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const quizclock = document.getElementById('quizclock');
let quizTime = 100;
const myQuestions = [
    {
      question: "Which of the following is used to define a function in Python?",
      answers: {
        a: "def",
        b: "function",
        c: "define",
        d: "func"
      },
      correctAnswer: "a"
    },
    {
      question: "What does the following SQL query do? SELECT * FROM employees WHERE department = 'Sales';",
      answers: {
        a: "Retrieves all employees from the Sales department",
        b:"Retrieves all columns from the employees table",
        c: "Retrieves only the department column from the employees table",
        d: "Retrieves all employees whose names contain Sales"
      },
      correctAnswer: "a"
    },
    {
      question:"What is the purpose of the SQL GROUP BY clause?",
      answers: {
        a: "It filters rows based on a specified condition",
        b: "It sorts the result set in ascending order",
        c: "It groups rows that have the same values into summary rows",
        d: "It combines rows from different tables based on a related column"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of the following tags is used to create a hyperlink in HTML?",
      answers: {
        a: "link",
        b: "a",
        c: "href",
        d: "url"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the purpose of the script tag?",
      answers: {
        a: "To define styles for a web page",
        b: "To include external JavaScript file",
        c: "To define a block of JavaScript code",
        d: "To create hyperlinks"
      },
      correctAnswer: "b"
    },
    {
      question: "Best Manga?",
      answers: {
        a: "Berserk",
        b: "Kingdom",
        c: "One Piece",
        d: "Hunter X Hunter"
      },
      correctAnswer: "b"
    }
  ];
  let correctAnswers = ['a','a','c','b','b','b']
function buildQuiz(){
    const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}



function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}
// display quiz right away
buildQuiz();
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}
let timeLeft = quizTime;
let timeID = setInterval(countdown, 1000)
function countdown() {
  if (timeLeft == 0) {
    clearInterval(timeID);
    let totalCorrect = checkAnswers();
    if (totalCorrect == correctAnswers.length) {
      window.alert("Congrats on getting 100%!");
    } else {
      window.alert(`You have ${totalCorrect} correct out of ${myQuestions.length}`);
    }
    // Reset the timer and update the display
    timeLeft = quizTime;
    quizclock.innerHTML = `${timeLeft}`;
  } else {
    timeLeft--;
    quizclock.innerHTML = `${timeLeft}`;
  }
}


showSlide(currentSlide);

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

const answerContainers = quizContainer.querySelectorAll('.answers');

// on submit, show results
submitButton.addEventListener('click', showResults);
function checkAnswers() {
  let correctCount = 0;
  for (let i = 0; i < myQuestions.length; i++) {
    const answerContainer = answerContainers[i];
    const selector = `input[name=question${i}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
     if (userAnswer === correctAnswers[i]) {
        correctCount++;
        myQuestions[i].className = "";
     } else {
        myQuestions[i].className = "wronganswer";
     }      
  }
  return correctCount;
}
let cover = document.getElementById('cover')
let message = document.getElementById('message')


function showResults(){
  // gather answer containers from our quiz
clearInterval(timeID)

// keep track of user's answers
let numCorrect = 0;

// for each question...
myQuestions.forEach( (currentQuestion, questionNumber) => {

  // find selected answer
  const answerContainer = answerContainers[questionNumber];
  const selector = `input[name=question${questionNumber}]:checked`;
  const userAnswer = (answerContainer.querySelector(selector) || {}).value;

  // if answer is correct
  if(userAnswer === currentQuestion.correctAnswer){
    // add to the number of correct answers
    numCorrect++;

    // color the answers green
    answerContainers[questionNumber].style.color = 'lightgreen';
  }
  // if answer is wrong or blank
  else{
    // color the answers red
    answerContainers[questionNumber].style.color = 'red';
  }
});

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
if (numCorrect == 6){
  cover.className = "hide"
  message.className = 'congrats'
}
}

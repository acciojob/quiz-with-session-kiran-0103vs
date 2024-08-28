//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
// script.js

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve saved answers from session storage
function getSavedAnswers() {
  return JSON.parse(sessionStorage.getItem('progress')) || {};
}

// Save answers to session storage
function saveAnswers() {
  const answers = {};
  questions.forEach((_, i) => {
    const selected = document.querySelector(`input[name="question-${i}"]:checked`);
    if (selected) {
      answers[i] = selected.value;
    }
  });
  sessionStorage.setItem('progress', JSON.stringify(answers));
}

// Load saved answers into the form
function loadSavedAnswers() {
  const savedAnswers = getSavedAnswers();
  Object.keys(savedAnswers).forEach(i => {
    const value = savedAnswers[i];
    const radio = document.querySelector(`input[name="question-${i}"][value="${value}"]`);
    if (radio) {
      radio.checked = true;
    }
  });
}

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  questions.forEach((q, i) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    
    const questionText = document.createElement('p');
    questionText.textContent = q.question;
    questionElement.appendChild(questionText);
    
    q.choices.forEach(choice => {
      const choiceElement = document.createElement('div');
      
      const choiceInput = document.createElement('input');
      choiceInput.type = 'radio';
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;
      
      if (getSavedAnswers()[i] === choice) {
        choiceInput.checked = true;
      }
      
      const choiceLabel = document.createElement('label');
      choiceLabel.textContent = choice;
      choiceLabel.prepend(choiceInput);
      
      choiceElement.appendChild(choiceLabel);
      questionElement.appendChild(choiceElement);
    });
    
    questionsElement.appendChild(questionElement);
  });
}

// Calculate the user's score
function calculateScore() {
  const savedAnswers = getSavedAnswers();
  let score = 0;

  questions.forEach((q, i) => {
    if (savedAnswers[i] === q.answer) {
      score++;
    }
  });

  return score;
}

// Display the user's score
function displayScore() {
  const score = calculateScore();
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
}

// Handle form submission
document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  saveAnswers();
  displayScore();
  localStorage.setItem('score', calculateScore()); // Save the score to local storage
});

// Initial rendering and setup
renderQuestions();
loadSavedAnswers();

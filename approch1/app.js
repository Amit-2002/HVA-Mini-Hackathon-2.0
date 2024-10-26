// let players = {};
// let categories = [];
// let currentCategory = null;
// let currentPlayer = 1; // Player 1 starts
// let currentQuestionIndex = 0;
// let questions = [];
// let scores = { player1: 0, player2: 0 };

// // Start game after players enter their names
// document.querySelector('#start-game').addEventListener('click', () => {
//     players.player1 = document.querySelector('#player1').value;
//     players.player2 = document.querySelector('#player2').value;

//     if (players.player1 && players.player2) {
//         // Hide player setup, show category selection
//         document.querySelector('#player-setup').style.display = 'none';
//         document.querySelector('#category-selection').style.display = 'block';
//         fetchCategories();
//     } else {
//         alert('Please enter both player names!');
//     }
// });

// // Fetch categories from API
// async function fetchCategories() {
//     try {
//         const response = await fetch('https://the-trivia-api.com/api/categories');
//         const data = await response.json();
//         categories = Object.keys(data); // Get category names
//         displayCategories();
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//     }
// }

// // Display categories
// function displayCategories() {
//     const categoryList = document.querySelector('#categories');
//     categoryList.innerHTML = '';
//     categories.forEach(category => {
//         const li = document.createElement('li');
//         li.innerText = category;
//         li.addEventListener('click', () => selectCategory(category));
//         categoryList.appendChild(li);
//     });
// }

// // Select a category and fetch questions
// async function selectCategory(category) {
//     currentCategory = category;
//     document.querySelector('#category-selection').style.display = 'none';
//     document.querySelector('#question-area').style.display = 'block';
//     await fetchQuestions();
//     displayQuestion();
// }

// // Fetch questions from API
// async function fetchQuestions() {
//     try {
//         // Fetch questions with 2 easy, 2 medium, 2 hard based on category
//         const response = await fetch(`https://the-trivia-api.com/v2/questions?categories=${currentCategory}&limit=6`);
//         questions = await response.json();
//         currentQuestionIndex = 0;
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//     }
// }

// // Display the current question
// function displayQuestion() {
//     if (currentQuestionIndex < questions.length) {
//         const question = questions[currentQuestionIndex];
//         document.querySelector('#current-question').innerText = question.question.text;
//         const answersList = document.querySelector('#answer-options');
//         answersList.innerHTML = '';

//         // Combine correct and incorrect answers and shuffle them
//         const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
//         allAnswers.sort(() => Math.random() - 0.5);

//         allAnswers.forEach(answer => {
//             const li = document.createElement('li');
//             li.innerText = answer;
//             li.addEventListener('click', () => checkAnswer(answer, question.correctAnswer));
//             answersList.appendChild(li);
//         });
//     } else {
//         showScores();
//     }
// }

// // Check if the selected answer is correct
// function checkAnswer(selectedAnswer, correctAnswer) {
//     if (selectedAnswer === correctAnswer) {
//         if (currentQuestionIndex < 2) {
//             scores[`player${currentPlayer}`] += 10; // Easy question
//         } else if (currentQuestionIndex < 4) {
//             scores[`player${currentPlayer}`] += 15; // Medium question
//         } else {
//             scores[`player${currentPlayer}`] += 20; // Hard question
//         }
//     }

//     // Switch players after each question
//     currentPlayer = currentPlayer === 1 ? 2 : 1;
//     currentQuestionIndex++;
//     displayQuestion();
// }

// // Show the final scores and end the game
// function showScores() {
//     document.querySelector('#question-area').style.display = 'none';
//     document.querySelector('#scoreboard').style.display = 'block';
//     document.querySelector('#score-player1').innerText = `${players.player1}: ${scores.player1} points`;
//     document.querySelector('#score-player2').innerText = `${players.player2}: ${scores.player2} points`;
// }

// // End the game
// document.querySelector('#end-game').addEventListener('click', () => {
//     alert('Game Over!');
//     location.reload();
// });








                        // updated
let players = {};
let categories = [];
let usedCategories = [];
let currentCategory = null;
let currentPlayer = 1; // Player 1 starts
let currentQuestionIndex = 0;
let questions = [];
let scores = { player1: 0, player2: 0 };

// Start game after players enter their names
document.querySelector('#start-game').addEventListener('click', () => {
    players.player1 = document.querySelector('#player1').value;
    players.player2 = document.querySelector('#player2').value;

    if (players.player1 && players.player2) {
        // Hide player setup, show category selection
        document.querySelector('#player-setup').style.display = 'none';
        document.querySelector('#category-selection').style.display = 'block';
        fetchCategories();
    } else {
        alert('Please enter both player names!');
    }
});

// Fetch categories from API
async function fetchCategories() {
    try {
        const response = await fetch('https://the-trivia-api.com/api/categories');
        const data = await response.json();
        categories = Object.keys(data); // Get category names
        displayCategories();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Display categories
function displayCategories() {
    const categoryList = document.querySelector('#categories');
    categoryList.innerHTML = '';
    categories.forEach(category => {
        if (!usedCategories.includes(category)) {
            const li = document.createElement('li');
            li.innerText = category;
            li.addEventListener('click', () => selectCategory(category));
            categoryList.appendChild(li);
        }
    });
}

// Select a category and fetch questions
async function selectCategory(category) {
    currentCategory = category;
    usedCategories.push(category); // Mark category as used
    document.querySelector('#category-selection').style.display = 'none';
    document.querySelector('#question-area').style.display = 'block';
    await fetchQuestions();
    displayQuestion();
}

// Fetch questions from API
async function fetchQuestions() {
    try {
        // Fetch questions with 2 easy, 2 medium, 2 hard based on category
        const response = await fetch(`https://the-trivia-api.com/v2/questions?categories=${currentCategory}&limit=6`);
        questions = await response.json();
        currentQuestionIndex = 0;
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// Display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.querySelector('#current-question').innerText = question.question.text;
        const answersList = document.querySelector('#answer-options');
        answersList.innerHTML = '';

        // Combine correct and incorrect answers and shuffle them
        const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
        allAnswers.sort(() => Math.random() - 0.5);

        allAnswers.forEach(answer => {
            const li = document.createElement('li');
            li.innerText = answer;
            li.addEventListener('click', () => checkAnswer(answer, question.correctAnswer));
            answersList.appendChild(li);
        });
    } else {
        // After all questions are answered, show scores and allow next category
        showScoresOrContinue();
    }
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        if (currentQuestionIndex < 2) {
            scores[`player${currentPlayer}`] += 10; // Easy question
        } else if (currentQuestionIndex < 4) {
            scores[`player${currentPlayer}`] += 15; // Medium question
        } else {
            scores[`player${currentPlayer}`] += 20; // Hard question
        }
    }

    // Switch players after each question
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentQuestionIndex++;
    displayQuestion();
}

// Show the final scores and allow next category or end the game
function showScoresOrContinue() {
    document.querySelector('#question-area').style.display = 'none';
    document.querySelector('#scoreboard').style.display = 'block';
    document.querySelector('#score-player1').innerText = `${players.player1}: ${scores.player1} points`;
    document.querySelector('#score-player2').innerText = `${players.player2}: ${scores.player2} points`;

    if (usedCategories.length === categories.length) {
        alert('All categories have been used. The game is over!');
        endGame();
    } else {
        // Allow players to continue with a new category or end the game
        document.querySelector('#continue-game').style.display = 'block';
    }
}

// Continue to next category selection
document.querySelector('#continue-game').addEventListener('click', () => {
    document.querySelector('#scoreboard').style.display = 'none';
    document.querySelector('#category-selection').style.display = 'block';
    document.querySelector('#continue-game').style.display = 'none';
    displayCategories(); // Show remaining categories
});

// End the game manually
document.querySelector('#end-game').addEventListener('click', () => {
    endGame();
});

// End the game and reload the page
function endGame() {
    alert('Game Over!');
    location.reload();
}

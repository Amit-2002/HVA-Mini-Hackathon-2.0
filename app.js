

let p1 = document.querySelector('#player1');
let p2 = document.querySelector('#player2');
let currentP;

let startBtn = document.querySelector('#start-game');
startBtn.addEventListener('click', () => {
    document.querySelector('#player-setup').style.display = 'none';
    currentP = p1.value;
    fetchCategories();
});

// Fetching categories.
async function fetchCategories() {
    const response = await fetch('https://the-trivia-api.com/api/categories');
    const data = await response.json();
    categories(data);
}

let selectedCategories = [];
let checkCategories = []

// Displaying categories.
function categories(data) {
    document.body.innerHTML = '';
    checkCategories = [];

    let categoriesDiv = document.createElement('div');
    let categoriesHeading = document.createElement('h1');
    categoriesHeading.textContent = "Choose Category : ";
    categoriesDiv.append(categoriesHeading);

    for (let ctgry in data) {
        if (!selectedCategories.includes(ctgry)) {
            checkCategories.push(ctgry);
            
            let li = document.createElement('li');
            li.className = 'ctgry';
            li.innerText = ctgry;
            categoriesDiv.append(li);

            li.addEventListener('click', () => {
                selectedCategoryQuestions(ctgry);
                selectedCategories.push(ctgry);                
            });
        }
    }
    
    document.body.append(categoriesDiv);
    
    if(checkCategories.length == 0){
        alert("All categories have been played...")
        gameEnd()
    }
}

// Fetching questions for the selected category.
async function selectedCategoryQuestions(ctgry) {
    const response = await fetch(`https://the-trivia-api.com/v2/questions?categories=${ctgry}&difficulty=easy,medium,hard&limit=100`);
    const data = await response.json();

    let easy_questions = data.filter(e => e.difficulty === 'easy').slice(0, 2);
    let medium_questions = data.filter(m => m.difficulty === 'medium').slice(0, 2);
    let hard_questions = data.filter(h => h.difficulty === 'hard').slice(0, 2);

    const allLevelQuestion = [...easy_questions, ...medium_questions, ...hard_questions];
    showQuestionWithOptionsAndValidation(allLevelQuestion);
}

let scores = {
    p1: 0,
    p2: 0
}
let currentIndex = 0;


function showQuestionWithOptionsAndValidation(allLevelQuestion) {
    displayQues(allLevelQuestion[currentIndex]);
    // Function to display the question.
    async function displayQues(ques) {
        // console.log(ques);
        document.body.innerHTML = '';

        let questionArea = document.createElement('div');
        questionArea.innerHTML = `<p><i>${currentP}:</i> ${ques.question.text}</p>`;
        document.body.append(questionArea);

        await showAnswer(ques);
    }

    // Function to show answers.
    async function showAnswer(ques) {
        let ansDiv = document.createElement('div');
    
        // Combine the correct answer and incorrect answers into one array
        let options = [ques.correctAnswer, ...ques.incorrectAnswers];
        
        // Shuffle the options array
        options = options.sort(() => Math.random() - 0.5);

        // Create buttons for the shuffled options
        options.forEach(option => {
            let optionBtn = document.createElement('button');
            optionBtn.textContent = option;
            ansDiv.appendChild(optionBtn);
            
            // Attach event listener to each button
            optionBtn.addEventListener('click', () => {
                checkAnswer(option, ques.correctAnswer);
            });
        });

        document.body.append(ansDiv);
    }

    // Check if the selected answer is correct.
    function checkAnswer(chosenAns, rightAns) {
        if (chosenAns === rightAns) {
            if (currentP === p1.value) {
                scores.p1 += scoresIncreament(currentIndex);
            } else {
                scores.p2 += scoresIncreament(currentIndex);
            }
        } else {
            alert('Wrong Answer!');
        }
        currentIndex += 1;
        currentP = currentP === p1.value ? p2.value : p1.value;

        if (currentIndex < allLevelQuestion.length) {
            displayQues(allLevelQuestion[currentIndex]);
        } else {
                currentIndex=0
            
                document.body.innerHTML = "<button class='another-category'>Choose another category</button> <button class='quite-game'>Quit game.!</button>"
                let anotherCategoryBtn = document.querySelector('.another-category');
                anotherCategoryBtn.addEventListener('click' , fetchCategories)

                let quiteGameBtn = document.querySelector('.quite-game');
                quiteGameBtn.addEventListener('click', () => {
                    gameEnd();
                })   
        }
    }
}

// Function to increase score based on index.
function scoresIncreament(index) {
    if (index < 2){
        return 10;
    }
    else if (index < 4){
        return 15;
    }
    else{
        return 25;
    }
    
}

// Function to end the game (you can customize this).
function gameEnd() {
    document.body.innerHTML = '';
    let scoreDisplay = document.createElement('div');
    let winnerh2 = document.createElement('h2');
    let looserh2 = document.createElement('h2');

    if (scores.p1 > scores.p2){
        winnerh2.textContent = `${p1.value} score is :- ${scores.p1} so ${p1.value} is the winner..!`;
        looserh2.textContent = `${p2.value} score is :- ${scores.p2} so ${p2.value} is the Looser..!`;
    }
    else if (scores.p2 > scores.p1){
        winnerh2.textContent = `${p2.value} score is :- ${scores.p2} so ${p2.value} is the winner..!`;
        looserh2.textContent = `${p1.value} score is :- ${scores.p1} so ${p1.value} is the Looser..!`;
    }
    else{
        winnerh2.textContent = `Game Over! Player 1: ${scores.p1}, Player 2: ${scores.p2} Both Player's score are same. So match is Tie......!!`;

    }
    
    scoreDisplay.append(winnerh2, looserh2);
    document.body.append(scoreDisplay);
}



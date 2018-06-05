/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify the player of guesses remaining
- Notify the player of the correct answer is loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(),
    guessesLeft = 3;

// UI Elements
const Jgame = document.querySelector('#game'),
      JminNum = document.querySelector('.min-num'),
      JmaxNum = document.querySelector('.max-num'),
      JguessBtn = document.querySelector('#guess-btn'),
      JguessInput = document.querySelector('#guess-input'),
      Jmessage = document.querySelector('.message');

// Assign UI min and max
JminNum.textContent = min;
JmaxNum.textContent = max;

// Play again event listener
Jgame.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
JguessBtn.addEventListener('click', function(){
    let guess = parseInt(JguessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } 

    // Check if won
    if(guess === winningNum){

        // Game over - won

        gameOver(true, `${winningNum} is correct! You win!`)

    } else {
        // Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game Over  - lost
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);

        } else {
            // Game continues - answer wrong

            // Change border
            JguessInput.style.borderColor = 'red';

            // Clear input
            JguessInput.value = '';

            // Tell user its wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }

});

// Game Over
function gameOver(won, msg){

    let color;
    won === true ? color = 'green'  : color = 'red';

    // Disable input
    JguessInput.disabled = true;
    // Change border color
    JguessInput.style.borderColor = color;
    // Set text color
    Jmessage.style.color = color;
    // Set message
    setMessage(msg);

    // Play again?
    JguessBtn.value = 'Play Again';
    JguessBtn.className += 'play-again';
}
// Get Winning Number
function getRandomNum(){
    return Math.floor(Math.random()*(max-min+1)+min);
}
      
// Set Message
function setMessage(msg, color){
    Jmessage.style.color = color;
    Jmessage.textContent = msg;
}
 



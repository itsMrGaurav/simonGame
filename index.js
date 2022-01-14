
// vars
let start = false, currLevel = 1, level = 1, highScore = currLevel;
let squares = ['blue', 'green', 'red', 'yellow'];
let wrongAudio = new Audio('sounds/wrong.mp3');

// get random value
const getRandInt = () => Math.floor(Math.random()*4);

// get new pattern
const getPattern = () => squares[getRandInt()];

// play audio by key
function playAudio(key){
    switch (key) {
        case 'blue':
            let blueAudio = new Audio('sounds/blue.mp3');
            blueAudio.play();
            break;
        case 'green':
            let greenAudio = new Audio('sounds/green.mp3');
            greenAudio.play();
            break;
        case 'red':
            let redAudio = new Audio('sounds/red.mp3');
            redAudio.play();
            break;
        case 'yellow':
            let yellowAudio = new Audio('sounds/yellow.mp3');
            yellowAudio.play();
            break;
        default:
            break;
    }
}


// animate squares
function animateSquare (sqr) {
    $(`#${sqr}`).addClass('pressed');
    setTimeout(() => $(`#${sqr}`).removeClass('pressed'), 100);
}


// generate first pattern
let pattern = [getPattern()];


// listen for keypress for a new game
$(document).on('keypress', function () {
    
    // start if not started
    if (! start) {

        // toggle start to stop listening for keypresses
        start = true;

        $('#level-title').text(`Level ${currLevel}`);
        currLevel = 1;
        level = 1;
        
        // play the first audio
        playAudio(pattern[0]);
        animateSquare(pattern[0]);
    }

});


// listening for clicks 
$(document).on('click', function (e) {

// activates only if game is start
    if (start) {

// checks if there is level to play else adds a new level
        if (level) {    
            
            // identify the target
            let clicked = e.target.id;

            if (clicked === pattern[level-1]) {
                playAudio(clicked);
                animateSquare(clicked);
                level--;
            }
            else {
    
                // if player clicks any square other than target
                let nonTargetSquares = squares.filter(key => key != pattern[level-1]); 
                if (nonTargetSquares.includes(clicked)){
                    animateSquare(clicked);
                    start = false;
                    $('#level-title').text('Wrong! Press any key to restart.');
                    $('body').addClass('game-over');
                    setTimeout(() => $('body').removeClass('game-over'), 100);
                
                // check if high score is low and set accordingly
                    if (highScore < currLevel){
                        $('.high-score').text(`High-score : ${currLevel}`);
                        highScore = currLevel;
                    }
                    
                    wrongAudio.play();
                    currLevel = 1;
                }
            }

            // adding new level
            if (! level) {
                currLevel++;
                let newSquare = getPattern();
                pattern.unshift(newSquare);
                setTimeout( () =>  {
                    playAudio(newSquare);
                    animateSquare(newSquare);
                    $('#level-title').text(`Level ${currLevel}`);
                }, 500);
                level = currLevel;
            }
        } 
    }
});




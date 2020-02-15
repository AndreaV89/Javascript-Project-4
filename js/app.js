/* Andrea Vannetti FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const qwerty = document.getElementById('qwerty');

document.getElementById('btn__reset').addEventListener('click', function() {
    game = new Game;
    game.startGame();
    console.log(game.activePhrase.phrase);
});

qwerty.addEventListener('click', function(e) {
    if(e.target.tagName == "BUTTON") {
        game.handleInteraction(e.target);
    }
});

document.addEventListener('keyup', function(e) {
    const letters = document.getElementsByClassName('key');
    for(let i = 0; i < letters.length; i++) {
        if(letters[i].textContent === e.key) {
            game.handleInteraction(letters[i]);
        }
    }   
});


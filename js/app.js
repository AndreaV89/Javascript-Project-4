/* Andrea Vannetti FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const qwerty = document.getElementById('qwerty');

document.getElementById('btn__reset').addEventListener('click', function() {
    game = new Game;
    game.startGame();
    document.addEventListener('keyup', keyupHandler);
});

qwerty.addEventListener('click', function(e) {
    if(e.target.tagName == "BUTTON") {
        game.handleInteraction(e.target);
    }
});

const keyupHandler = (e) => {
    console.log(e.key);
    const letters = document.getElementsByClassName('key');
    for(let i = 0; i < letters.length; i++) {
        if(letters[i].textContent === e.key && letters[i].disabled === false) {
            game.handleInteraction(letters[i]);
        }
    }  
}








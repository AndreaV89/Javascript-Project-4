/* Andrea Vannetti FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }


    /**
     * Creates phrases for use in game
     * @return {array}  phrasesArray - An array of phrases that could be used in the game
     */
    createPhrases() {
        const phrasesArray = ['Life is like a box of chocolates',
                              'May the force be with you',
                              'Tomorrow is another day',
                              'Seize the day',
                              'Houston we have a problem'];
        return phrasesArray;
    };


    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        const index = Math.floor(Math.random() * this.phrases.length);
        const randomPhrase = new Phrase(this.phrases[index]);

        return randomPhrase;
    }


    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        // Hide the overlay
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';

        // Choose a random phrase and show in the board
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Handles onscreen keyboard button clicks
     * @param {HTMLButtonElement} button - The clicked button element
     */
    handleInteraction(button) {
        // Disables the selected letter on the keyboard
        button.disabled = 'true';
        if(this.activePhrase.checkLetter(button.innerText)) {
            // If the letter chosen is in the phrase give the 'chosen' class to the button, show the letter and checks for win
            button.classList.add('chosen');
            button.style.transition = 'transform 1s ease-in';
            button.style.transform = 'scale(2,2)';
            setTimeout(() => button.style.transform = 'none', 300);
            this.activePhrase.showMatchedLetter(button.innerText);
            if(this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            // If the letter chosen isn't in the phrase give the 'wrong' class to the button and remove a life
            button.classList.add('wrong');
            button.style.transition = 'all .05s ease-in';
            this.shake(button);
            this.removeLife();
        }     
    }

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        this.missed += 1;
        const heart = document.querySelectorAll('img[alt="Heart Icon"]');
        heart[this.missed - 1].setAttribute('src', 'images/lostHeart.png');
        if(this.missed === 5) {
            this.gameOver(false);
        }
    }

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const hideLetters = document.getElementsByClassName('hide');
        if(hideLetters.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        const message = document.getElementById('game-over-message');
        overlay.style.display = 'block';
        if(gameWon) {
            message.innerText = 'You Win!';
            overlay.setAttribute('class', 'win');
            this.resetGame();
            document.removeEventListener('keyup', keyupHandler);
        } else {
            message.innerText = 'You Lose!';
            overlay.setAttribute('class', 'lose');
            this.resetGame();
            document.removeEventListener('keyup', keyupHandler);
        }
    }

    /**
     * Resets the game
     */
    resetGame() {
        const ul = document.querySelector('#phrase ul');
        ul.innerHTML = '';
        this.missed = 0;
        const btn = document.querySelectorAll('.keyrow button');
        for(let i = 0; i < btn.length; i++) {
            // Reset button styles
            btn[i].setAttribute('class', 'key');
            btn[i].removeAttribute('disabled');
            btn[i].style.transform = 'initial';
        }
        const img = document.querySelectorAll('.tries img');
        for(let i = 0; i < img.length; i++) {
            // Reset lifes
            img[i].setAttribute('src', 'images/liveHeart.png');
        }
    }

    /**
     * Shake the button if the letter is wrong
     * @param {HTMLButtonElement} button - The button to shake 
     */
    shake(button) {
        button.style.transform = 'rotate(10deg)';
        setTimeout(() => button.style.transform = 'rotate(-15deg)', 50);
        setTimeout(() => button.style.transform = 'rotate(15deg)', 100);
        setTimeout(() => button.style.transform = 'rotate(-15deg)', 150);
        setTimeout(() => button.style.transform = 'rotate(15deg)', 200);
        setTimeout(() => button.style.transform = 'rotate(-15deg)', 250);
        setTimeout(() => button.style.transform = 'rotate(15deg)', 300);
        setTimeout(() => button.style.transform = 'none', 350); 
    }
}
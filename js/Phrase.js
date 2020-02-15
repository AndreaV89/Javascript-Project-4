/* Andrea Vannetti FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }


    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');
        let ulHTML = '';
        for(let i = 0; i < this.phrase.length; i++) {
            if(this.phrase[i] === ' ') {
                ulHTML += `<li class="space">${this.phrase[i]}</li>`;
            } else {
                ulHTML += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
            }
        }
        ul.innerHTML = ulHTML;
    }


    /**
     * Checks if passed letter is in phrase
     * @param {string}  letter - Letter to check
     */
    checkLetter(letter) {
        let check = false;
        for(let i = 0; i < this.phrase.length; i++) {
            if(letter === this.phrase[i]) {
                check = true;
            }
        }
        return check;
    }


    /**
     * Displays passed letter on screen after a match is found
     * @param (string) letter - Letter to display
     */
    showMatchedLetter(letter) {
        const matchedLetters = document.getElementsByClassName(`${letter}`);
        for(let i = 0; i < matchedLetters.length; i++) {
            matchedLetters[i].classList.remove('hide');
            matchedLetters[i].classList.add('show');
        }
    }
}
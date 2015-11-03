var Terminal = Terminal || {};
Terminal.Hacks = (function(Terminal) {
"use strict";

function PasswordGuess(server) {
    this.guesses = 0;
    this.maxGuesses = 5;
    this.password = "FISH";
    this.words = ["FISH", "BOSH", "FIST", "FAST", "BATH"]; 
    this.server = server;
}

PasswordGuess.prototype.getGuessText = function() {
    return (this.guesses + ' of ' + this.maxGuesses + ' guesses');
}

PasswordGuess.prototype.guess = function(guess, listitem) {
    if (this.password === guess) {
        this.server.onHack();
    } else {
        // The guess isn't correct - display the number of correct letters.
        this.guesses++;
        var numCorrect = 0;
        for (var i = 0; i < guess.length && i < this.password.length; i++) {
            if (guess[i] === this.password[i]) {
                numCorrect++;
            }
        }

        $('#guessresult').show().text(numCorrect + ' characters correct');
        $('#guesscount').text(this.getGuessText());
    }
}

PasswordGuess.prototype.start = function() {
    $('.popup')
        .empty()
        .append($('<h2>')
            .attr('id', 'guesscount')
            .text(this.getGuessText()))
        .append($('<h3>')
            .attr('id', 'guessresult')
            .attr('style', 'display: none'));
    var wordList = $('<ul>')
        .attr('id', 'words')
        .appendTo('.popup');
    for (var i = 0; i < this.words.length; i++) {
        var li = $('<li>')
            .text(this.words[i])
            .appendTo(wordList);

        var guess = function(obj, _word, _listitem) {
            return function() {
                obj.guess(_word, _listitem);
            }
        }(this, this.words[i], li);

        li.click(guess);
    }
}

return {
    "PasswordGuess": PasswordGuess
};

})(Terminal);

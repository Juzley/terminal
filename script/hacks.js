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
};

PasswordGuess.prototype.guess = function(guess, listitem) {
    this.guesses++;

    if (this.password === guess) {
        var success = function(_obj) {
            return function() {
                $('.popup').hide();
                _obj.server.onHack();
            };
        }(this);

        $('.popup')
            .empty()
            .append($('<p>').text('@@@Success Text@@@'))
            .append($('<a>').click(success).text('OK'));
    } else if (this.guesses === this.maxGuesses) {
        var failure = function(_obj) {
            return function() {
                $('.popup').hide();
                // @@@ TODO: should prob be some penalty here.
            };
        }(this);

        $('.popup')
            .empty()
            .append($('<p>').text('@@@Failure Text@@@'))
            .append($('<a>').click(failure).text('OK'));
    } else {
        // The guess isn't correct - display the number of correct letters.
        var numCorrect = 0;
        for (var i = 0; i < guess.length && i < this.password.length; i++) {
            if (guess[i] === this.password[i]) {
                numCorrect++;
            }
        }

        $('#guessresult').show().text(
            guess + ": " + numCorrect + ' characters correct');
        $('#guesscount').text(this.getGuessText());
    }
};

PasswordGuess.prototype.startHack = function() {
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

        var guess = function(_obj, _word, _listitem) {
            return function() {
                _obj.guess(_word, _listitem);
            };
        }(this, this.words[i], li);

        li.click(guess);
    }
};

PasswordGuess.prototype.start = function() {
    var progress = function(_obj) {
        return function() {
            _obj.startHack();
        };
    }(this);

    $('.popup')
        .empty()
        .show()
        .append($('<p>').text('@@@Text explaining the hack@@@'))
        .append($('<a>').click(progress).text('OK'));
};

return {
    "PasswordGuess": PasswordGuess
};

})(Terminal);

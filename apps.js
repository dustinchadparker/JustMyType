


$(document).ready(function () {

    $('#keyboard-upper-container').hide();

    //make a holder for background color
    let previousColor = $('#126').css("background-color");

    //use keypress to get ascii of random char
    $(document.body).keypress(function (e) {
        if ((e.which < 65) && (e.which > 26)) {
            $('#' + e.which).css('background-color', 'yellow');
        }
    });

    //Shows caps if shift is held; otherwise shows lowercase.
    $(document.body).keydown(function (e) {

        $('#' + e.which).css('background-color', 'yellow');

        if (e.which == 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        } else {
            if ((e.which < 91) && (e.which > 64)) {
                e.which = e.which + 32;
                $('#' + e.which).css('background-color', 'yellow');
            }
        }
    });

    //shows lowercase and returns keys to previous background color
    $(document.body).keyup(function (e) {

        $('.key').css('background-color', previousColor);

        if (e.which == 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }
    });

    //array of sentences to be typed
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];


    //get date for minutes and words/mistakes accumulated
    let seconds = 0;
    let numWords = 0;
    let numMistakes = 0;
    let interval = setInterval(secondsF, 1000);

    function secondsF() {
        seconds++;
    }

    //typing out the sentences.
    let i = 0;
    let counter = 0;
    let positionOfChar = 20;
    $('div#sentence').text(sentences[0]);
    $('div#target-letter').text("t");

    $(document.body).keypress(function (e) {



        if (i < sentences.length) {

            let totalChar = sentences[i].length;

            if (counter <= totalChar) {

                let keyPressed = e.which;
                let currentChar = String.fromCharCode(e.which);

                if (currentChar == sentences[i].charAt(counter)) {

                    //character is correct, logs it
                    if (sentences[i].charAt(counter) == " ") {
                        currentChar = "(space)";
                    }

                    let test = "<span style='color: green'>✔</span>" + currentChar;
                    $('#feedback').append(test);

                    //shows next letter if correct
                    $('div#target-letter').text(sentences[i].charAt(counter + 1));
                    //show (SPACE) if next key should be spacebar
                    if (sentences[i].charAt(counter + 1) == " ") {
                        $('div#target-letter').text("(space)");
                    }
                    //move yellow block around
                    positionOfChar += 17;
                    //set pos of yellow block
                    $('#yellow-block').css({
                        'width': '10px',
                        'left': positionOfChar,
                    })

                    counter++;
                } else {
                    //character is NOT correct, logs it
                    let test = "<span style='color: red'>X</span>" + currentChar;
                    $('#feedback').append(test);
                    numMistakes++;
                }

            }

            //resets and increments once end of sentence
            if (counter >= totalChar) {
                i++;
                positionOfChar = 20;
                $('#yellow-block').css({
                    'width': '10px',
                    'left': positionOfChar+'px',
                })
                $('#feedback').empty();
                //shows next sentence  in array
                $('div#sentence').text(sentences[i]);
                
                counter = 0;

            }

            if (i >= sentences.length) {
                let minutes = seconds / 60;
                const numWords = 54;
                $('<div id=winDiv>' + ("SCORE: " + ((numWords / minutes) - (2 * numMistakes))) + ' WPM <br>PLAY AGAIN?<div>').insertAfter($('#prompt-container'));
                $('<button id=noButton>NO</button>').insertAfter($('#winDiv'));
                $('<button id=yesButton>YES</button>').insertAfter($('#winDiv'));
                
                seconds = 0;
                numword = 0;
                numMistakes = 0;

                $('#yesButton').click(function() {
                    location.reload();
                })
            }

        }

    });

});

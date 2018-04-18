$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Woa!', 'Oh snap!', "Hella good!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Which one of these is not a Pokemon game released on Gameboy?",
            "c": ["Pokemon Black", "Pokemon Red", "Pokemon Blue"],
            "answer": 0
        },
        // question 2
        {
            "q": "Which *NSYNC members starred on The All-New Mickey Mouse Club?",
            "c": ["Justin Timberlake and JC Chasez", "Lance Bass and Joey Fatone", "Chris KirkPatrick and Justin Timberlake"],
            "answer": 0
        },
        // question 3
        {
            "q": "Mr. Feeny was a teacher in what popular 90's sitcom?",
            "c": ["Saved by the Bell", "Beverly Hills, 90210", "Boy Meets World"],
            "answer": 2
        },
        // question 4
        {
            "q": "What was Tommy's last name in Rugrats?",
            "c": ["Smith", "DeVille", "Pickles"],
            "answer": 2
        },
        // question 5
        {
            "q": "The gameshow where teams competed to find lost treasures in a Mayan temple was called . . ?",
            "c": ["Legends of the Hidden Temple", "The Mayan Maze", "Secrets of a Lost Temple"],
            "answer": 0
        },
        // question 6
        {
            "q": "Jagged Little Pill is the album by which singer?",
            "c": ["Christina Aguilera", "Alanis Morissette", "Whitney Houston"],
            "answer": 1
        },
        // question 7
        {
            "q": "Full House took place in which City?",
            "c": ["New York", "San Francisco", "Los Angeles"],
            "answer": 1
        },
        // question 8
        {
            "q": "Waterfalls was a popular song by what group?",
            "c": ["Salt-N-Peppa", "Destineys Child", "TLC"],
            "answer": 2
        },
        // question 9
        {
            "q": "This goo created by Nickelodian was famous for making a fart noise.  What was it called?",
            "c": ["GAK", "FLOAM", "Flubber"],
            "answer": 0
        },
        // question 10
        {
            "q": "Kevin, from Home Alone help make this toy a hit in the 90's",
            "c": ["Army Men", "Talkboy", "Tommy Gun"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});

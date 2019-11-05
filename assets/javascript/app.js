let card = $("#quiz-area");

// Question set
let questions = [
    {
        question: "What is the slowest animal in the world?",
        answers: ["Tortoise", "Three-toed Sloth", "Tree Frog", "Humpback"],
        correctAnswer: "Three-toed Sloth"
    },
    {
        question: "A snail can sleep for how many years?",
        answers: ["1 year", "2 year", "3 year", "4 year"],
        correctAnswer: "3 year"
    },
    {
        question: "How many heart chambers a cockroach has?",
        answers: ["4", "8", "12", "16"],
        correctAnswer: "12"
    },
    {
        question: "Which animal never sleeps'?",
        answers: ["Bullfrog", "Dolphin", "Parrot", "Naked Molerat"],
        correctAnswer: "Bullfrog"
    },
    {
        question: "A group of hedgehogs is known as?",
        answers: ["Herd", "Huddle", "Group", "Pickles"],
        correctAnswer: "Pickles"
    },
    {
        question: "Which animal has the longest lifespan?",
        answers: ["Galapagos Turtle", "Artic Whale", "Cockroach", "Dolphin"],
        correctAnswer: "Artic Whale"
    },
    {
        question: "How many glasses of milk does a cow make in it's life?",
        answers: ["15,000", "30,000", "100,000", "200,000"],
        correctAnswer: "200,000"
    },
    {
        question: "Which animal has no vocal cords?",
        answers: ["Chimpanzee", "Rhino", "Giraffe", "Hippo"],
        correctAnswer: "Giraffe"
    }
];

// Variable that will hold the setInterval
let timer;

let game = {
    correct: 0,
    incorrect: 0,
    counter: 120,

    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1000);

        $("#sub-wrapper").prepend(
            "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
        );

        $("#start").remove();

        for (let i = 0; i < questions.length; i++) {
            card.append("<h2>" + questions[i].question + "</h2>");
            for (let j = 0; j < questions[i].answers.length; j++) {
                card.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }

        card.append("<button id='done'>Done</button>");
    },

    done: function () {
        let inputs = card.children("input:checked");
        for (let i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === questions[i].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        }
        this.result();
    },

    result: function () {
        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        card.html("<h2>All Done!</h2>");
        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    }
};

// CLICK EVENTS

$(document).on("click", "#start", function () {
    game.start();
});

$(document).on("click", "#done", function () {
    game.done();
});

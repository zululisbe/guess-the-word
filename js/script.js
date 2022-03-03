const guessedLettersElement = document.querrySelector(".guessed-letters");
const guessButton = document.querrySelector(".guess");
const inputLetters = document.querrySelector(".letter");
const wordProgress = document.querrySelector(".word-in-progress");
const remainingLetters = document.querrySelector(".remaining");
const remainingGuesses = document.querrySelector(".remaining span");
const message = document.querrySelector(".message");
const playAgain = document.querrySelector(".play-again");

// Magnolia word
const word = "magnolia";

//Guessed letters array
const guessedLetters = [ ];

//function to add placeholders for each letter
const placeholder = function (word) {
	const placeholderLetters = [];
	for (const letter of word) {
		console.log(letter);
		placeholderLetters.push("●");
	}
 wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


//Event listener for guess button
guessButton.addEventListener("click", function (e) {
	e.preventDefault();
	message.innerText = "";
	const guess = inputLetters.value;
	const goodGuess = validateInput(guess);
	
	if (goodGuess) {
		makeGuess(guess);
	}
	inputLetters.value = "";
});

//Function to check players input
const validateInput = function (input) {
	const acceptedLetter = /[a-zA-Z]/;
	if (input === 0) {
		message.innerText = "Please enter a letter";
	} else if (input.length > 1) {
		message.innerText = "Please enter a single letter";
	} else if (!input.match(acceptedLetter)) {
		message.innerText = "Please enter a letter from A to Z";
	} else {
		return input;
	}
};

const makeGuess = function (guess) {
	guess = guess.toUpperCase ();
	if (guessedLetters.includes(guess)) {
		message.innerText = "You already guessed that letter, pick another one";
	} else {
		guessedLetters.push(guess);
		console.log(guessedLetters);
	}
};






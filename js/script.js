const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetters = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingLetters = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

// Magnolia word
const word = "magnolia";

//Guessed letters array
const guessedLetters = [];

//function to add placeholders for each letter
const placeholder = function (word) {
	const placeholderLetters = [];
	for (const letter of word) {
		console.log(letter);
		placeholderLetters.push("💜");
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
		showGuessedLetters();
		updateWordProgress(guessedLetters);
	}
};

//Track player guesses
const showGuessedLetters = function() {
	guessedLettersElement.innerHTML="";
	for (const letter of guessedLetters) {
		const li = document.createElement("li");
		li.innerText = letter;
		guessedLettersElement.append(li);
	}
};

//function to track the word in progress
const updateWordProgress = function(guessedLetters) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split("");
	const revealWord = [];
	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			revealWord.push(letter.toUpperCase());
		} else {
			revealWord.push("💜");
		}
	}
	//console.log(revealWord);
	wordProgress.innerText = revealWord.join("");
	checkIfWin();
};

//Did I win Function
const checkIfWin = function () {
	if (word.toUpperCase() === wordProgress.innerText) {
		message.classList.add("win");
		message.innerHTML = `<p class="Hightlight"> You have won!!!</p>`;
	}
};




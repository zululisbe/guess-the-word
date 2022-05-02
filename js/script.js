const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// Magnolia word
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
	const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
	const words = await response.text();
	const wordArray = words.split("\n");
	const randomIndex = Math.floor(Math.random() * wordArray.length);
	word = wordArray[randomIndex].trim();
	placeholder(word);
};

//Start up the game
getWord();

//function to add placeholders for each letter
const placeholder = function (word) {
	const placeholderLetters = [];
	for (const letter of word) {
		//console.log(letter);
		placeholderLetters.push("💜");
	}
 	wordProgress.innerText = placeholderLetters.join("");
};

//Event listener for guess button
guessLetterButton.addEventListener("click", function (e) {
	e.preventDefault();
	message.innerText = "";
	const guess = letterInput.value;
	const goodGuess = validateInput(guess);
	
	if (goodGuess) {
		makeGuess(guess);
	}
	letterInput.value = "";
});

//Function to check players input
const validateInput = function (input) {
	const acceptedLetter = /[a-zA-Z]/;
	if (input.length === 0) {
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
		updateGuessesRemaining(guess);
		showGuessedLetters();
		updateWordProgress(guessedLetters);
	}
};

//Track player guesses
const showGuessedLetters = function() {
	guessedLettersElement.innerHTML = "";
	for (const letter of guessedLetters) {
		const li = document.createElement("li");
		li.innerText = letter;
		guessedLettersElement.append(li);
	}
};

//function to track the word in progress
const updateWordProgress = function (guessedLetters) {
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

const updateGuessesRemaining = function (guess) {
	const upperWord = word.toUpperCase();
	if (!upperWord.includes(guess)) {
		//Oh Dear- bad guess, lose a life
		message.innerText = `Sorry, the word has no ${guess} in it!`;
		remainingGuesses -= 1;
	} else {
		message.innerText = `Well done, the word has the letter ${guess}.`;
	}

	if (remainingGuesses === 0) {
		message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
	} else if (remainingGuesses === 1) {
		remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
	} else {
		remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
	}
};

//Did I win Function
const checkIfWin = function () {
	if (word.toUpperCase() === wordProgress.innerText) {
		message.classList.add("win");
		message.innerHTML = `<p class="Hightlight"> You have won!!!</p>`;
	}
};





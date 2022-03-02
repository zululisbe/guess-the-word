// UL for players guessed letters to appear
const guessedLettersElement = document.querrySelector(".guessed-letters");

//Button for guess!
const guessButton = document.querrySelector(".guess");

//Text input for user letters
const inputLetters = document.querrySelector(".letter");

//P where word progess appears
const wordProgress = document.querrySelector(".word-in-progress");

//P where remaining letters appear
const remainingLetters = document.querrySelector(".remaining");

//span inside the paragraph where remaining guesses appear
const remainingGuesses = document.querrySelector(".remaining span");

//Empty p where messages appear to user when they guess a letter
const message = document.querrySelector(".message");

//Hidden button for play again
const playAgain = document.querrySelector(".play-again");

// Magnolia word
const word = "magnolia";

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
	const guess = inputLetters.value;
	console.log(guess);
});
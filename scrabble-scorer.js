// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let newPointStructure = transform(oldPointStructure);
function cleanWord(word) { 
   let cleanWord = '';
   cleanWord = word.replace(` `, ``)
   return cleanWord.toUpperCase();
};

function initialPrompt() {
   let userWord = input.question("Let's play some scrabble!\n\nEnter a word: ");
   return userWord;
};

function simpleScorer(word){
   word = cleanWord(word);
   let scoredWord = 0;
   for (i = 0; i < word.length; i++) {
      scoredWord += 1;
   };
   return scoredWord;
};

function vowelBonusScorer(word) {
   word = cleanWord(word);
   const vowels = [`A`, `E`, `I`, `O`, `U`];
   let scoredWord = 0;
   for (i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         scoredWord += 3;
      } else {
         scoredWord += 1;
      };
   };
   return scoredWord;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (i = 0; i < word.length; i++) {
      for (let letter in newPointStructure) {
         if (letter.includes(word[i])) {
            score += newPointStructure[letter]
         }
      }
   }
   return score;
};


const scoringAlgorithms =  [
   {name: `simple score`, desc: `Each letter is worth 1 point.`, scorerFunction: simpleScorer},
   {name: `bonus vowels`, desc: `Vowels are 3 pts, consonants are 1 pt.`, scorerFunction: vowelBonusScorer},
   {name: `scrabble`, desc: `The traditional scoring algorithm.`, scorerFunction: scrabbleScorer}
];

function scorerPrompt(userInput) {
   let scoreOption = "";
   console.log(`Which scoring algorithm would you like to use?\n\n`);
   console.log(`0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system`)
   let userNum = input.question(`Enter 0, 1, 2: `);
   if (userNum === '0' || userNum === `1` || userNum === `2`) {
      scoreOption = `your word was: ${userInput}, with a score of: ${scoringAlgorithms[userNum].scorerFunction(userInput)}`;
   } else {
      scoreOption = `invalid input please try inputing a value from 0-2.`;
   };
   console.log(scoreOption);
   
   return scoreOption;
};

function transform(obj) {
   let newObject = {};
   for (let key in obj) {
      for (let letter in obj[key]) {
         newObject[obj[key][letter].toLowerCase()] = Number(key);
      };
   };
   return newObject;
};



function runProgram() {
   let userInput = initialPrompt();
   scorerPrompt(userInput);
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

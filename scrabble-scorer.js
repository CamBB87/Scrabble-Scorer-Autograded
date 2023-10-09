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


// function cleanWord(word) { 
//    return word.replace(` `, ``).toUpperCase();
// };

function cleanWord(word) { 
   let cleanWord = '';
   for (let i in word) {
      const char = word[i];
      if ((word[i] >= 'a' && word[i]<= 'z') || (word[i] >= 'A' && word[i] <= 'Z')) {
        cleanWord += word[i];
      }
    }
   return cleanWord.toUpperCase();
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

let scrabbleScorer;

const scoringAlgorithms =  [
   simpleScore = {name: `simple score`, desc: `Each letter is worth 1 point.`, scoreFunc: simpleScorer},
   bonusVowels = {name: `bonus vowels`, desc: `Vowels are 3 pts, consonants are 1 pt.`, scoreFunc: vowelBonusScorer},
   scrabble = {name: `scrabble`, desc: `The traditional scoring algorithm.`, scoreFunc: oldScrabbleScorer}
];

function initialPrompt() {
   let userWord = input.question("Let's play some scrabble!\n\nEnter a word: ");
   return userWord;
};

function scorerPrompt(userInput) {
   let scoreOption = "";
   console.log(`Which scoring algorithm would you like to use?\n\n`);
   console.log(`0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system`)
   let userNum = input.question(`Enter 0, 1, 2: `);
   if ('0' <= userNum <= '3') {
      scoreOption = `your word was ${userInput}, with a score of:\n${scoringAlgorithms[userNum].scoreFunc(userInput)}`;
   } else {
      scoreOption = `invalid input please try inputing a value from 0-2.`;
   };
   console.log(scoreOption);
   
   return scoreOption;
};

function transform(obj) {
   let newObject = null;
   for (let x in oldPointStructure) {
      
   }
   return newObject;
};

let newPointStructure = {
   a: 1,
   b: 3,
   c: 3,
   d: 2,
   e: 1,
   f: 4,
   g: 2,
   h: 4,
   i: 1,
   j: 8,
   k: 5,
   l: 1,
   m: 3,
   n: 1,
   o: 1,
   p: 3,
   q: 10,
   r: 1,
   s: 1,
   t: 1,
   u: 1,
   v: 4,
   w: 4,
   x: 8,
   y: 4,
   z: 10
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

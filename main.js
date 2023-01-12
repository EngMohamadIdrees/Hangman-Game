// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Conatiner
let lettersContainer = document.querySelector(".letters");
//  Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  // Appedn The Letter To Span
  span.appendChild(theLetter);

  //   Create Span Claas
  span.className = "letter-box";
  //   Append Span to LettersContainer
  lettersContainer.appendChild(span);
});

// Create Object Of Words + Categories
// const words = {
//   programing: ["php", "javascript", "python", "dart", "mysql"],
//   sports: [
//     "fcb barcelona",
//     "realmadrid",
//     "fcb bayernmunchen",
//     "napoli",
//     "liverpool",
//   ],
//   countries: ["syria", "egypt", "jordan", "irq", "algeria"],
// };
let result = fetch("./data.json").then((allData) => {
  let Data = allData.json();
  return Data;
});

result.then((words) => {
  // Get Random Proparty
  let allKeys = Object.keys(words[0]);
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);
  let randomPropName = allKeys[randomPropNumber];
  let randomPropValue = words[0][randomPropName];

  // // Get Random word

  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  let randomValueValue = randomPropValue[randomValueNumber];

  // Set Catrgory Info
  document.querySelector(".game-info .category span").innerHTML =
    randomPropName;

  // Get Letters-guess Element
  let lettersGuessContainer = document.querySelector(".letters-guess");

  // Convert Chosen Word To Array
  let lettersAndSpace = Array.from(randomValueValue);

  // Set Right Attemps
  let rightAttemps = 0;

  // Create Span Depend On Word
  lettersAndSpace.forEach((letter) => {
    // Create Empty Span
    let emptySpan = document.createElement("span");
    //   If Letter Is space
    if (letter === " ") {
      rightAttemps++;
      emptySpan.className = "with-space";
    }
    //   Append Span To Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
  });

  // Select Guess Span
  let guessSpan = document.querySelectorAll(".letters-guess span");
  // Set Wrong Attemps
  let wrongAttemps = 0;

  // Select The Darw Element
  let theDraw = document.querySelector(".hangman-draw");

  // Handel Clicking On Letters
  document.addEventListener("click", (event) => {
    // Set Statues
    let theStatus = false;

    if (event.target.className === "letter-box") {
      event.target.classList.add("clicked");

      // Get Letter Clicked
      let theClickedLetter = event.target.innerHTML.toLowerCase();

      // The Chosen Word
      let theChosenWord = Array.from(randomValueValue.toLowerCase());

      theChosenWord.forEach((wordLetter, wordIndex) => {
        if (wordLetter == theClickedLetter) {
          // Set the Status To Correct
          theStatus = true;

          // Increase Right Attpems
          rightAttemps++;
          // Loop At  All Guess Spans
          guessSpan.forEach((span, spanIndex) => {
            if (wordIndex === spanIndex) {
              span.innerHTML = wordLetter;
            }
          });
        }
      });
      // Outside the Loop
      if (theStatus === false) {
        // Increase The Wrong Attemps
        wrongAttemps++;

        // play Fail Sound
        if (wrongAttemps < 8) {
          document.getElementById("fail").play();
        }
        // Add Class Wrong to Draw Element
        theDraw.classList.add(`worng-${wrongAttemps}`);

        // End Game Function
        if (wrongAttemps === 8) {
          endGame();
          lettersContainer.classList.add("finished");
          document.getElementById("finish").play();
        }
      } else {
        if (rightAttemps !== lettersAndSpace.length)
          document.getElementById("success").play();
      }
      if (rightAttemps === lettersAndSpace.length) {
        lettersContainer.classList.add("finished");
        document.getElementById("win").play();
        winGame();
      }
    }
  });
  // End Game function
  function endGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(
      `Game Over, The Word Is ${randomValueValue}`
    );
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";

    // Append Div to body
    document.body.appendChild(div);
  }
  function winGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(
      `You Win, Congratulations The Word Is ${randomValueValue}`
    );
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";

    // Append Div to body
    document.body.appendChild(div);
  }
});

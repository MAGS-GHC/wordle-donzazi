// Creating the squares:
document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  let GuessedWords = [[]];
  let availableSpace = 1;

  let word = "Dairy";

  const keys = document.querySelectorAll(".keyboard-row button");

  function HandleSubmitWord() {}

  function getCurrentWorldArray() {
    const numberOfGuessedWords = GuessedWords.length;
    return GuessedWords[numberOfGuessedWords - 1];
  }

  function UpdateGuessedWords(letter) {
    const CurrentWorldArray = getCurrentWorldArray();

    if (CurrentWorldArray && CurrentWorldArray.length < 5) {
      CurrentWorldArray.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace = availableSpace + 1;

      availableSpaceEl.textContent = letter;
    }
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      UpdateGuessedWords(letter);

      if (letter === "Enter") {
        HandleSubmitWord();
      }
    };
  }
});

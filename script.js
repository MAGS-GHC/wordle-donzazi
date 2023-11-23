// Creating the squares:
document.addEventListener("DOMContentLoaded", () => {
  createSquares();

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

let height = 6; // Number of guesses
let width = 5; // lenght of the word

let row = 0; // current guess (attemp #)
let col = 0; // current letter for that attempt

let gameOver = false;
let word = "SQUID";

window.onload = function () {
  initialize();
};

function initialize() {
  // Create the game board
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      //<span id="0-0" class="tile"></span>
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Listen for Key Press
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    //alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currTile.innerText = "";
    } else if (e.code == "Enter") {
      update();
      row += 1; //start new row
      col = 0; // start at 0 for new row
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  });
}

function update() {
  let correct = 0;
  let letterCount = {}; //KENNY --> {K:1, E:1, N:2, Y:1}
  for (let i = 0; i < word.length; i++) {
    letter = word[i];
    if (letterCount[letter]) {
      letterCount[letter] += 1;
    } else {
      letterCount[letter] = 1;
    }
  }

  // First iteration, check all the correct ones
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;

    //Is in the correct position
    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
      letterCount[letter] -= 1;
    }

    if (correct == width) {
      gameOver = true;
    }
  }

  // Go again and mark which ones are present but in wrong position
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;

    if (!currTile.classList.contains("correct")) {
    }

    // Is it in the word?
    if (word.includes(letter) && letterCount[letter] > 0) {
      currTile.classList.add("present");
      letterCount[letter] -= 1;
    }
    // Not in the word
    else {
      currTile.classList.add("absent");
    }
  }
}

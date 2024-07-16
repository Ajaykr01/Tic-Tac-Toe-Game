let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // playerX, player0

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const colors = {
  O: "blue",
  X: "red",
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "") {
      if (turn0) {
        // player0
        box.innerText = "O";
        box.style.color = colors["O"];
        turn0 = false; // Now the turn of player X.
      } else {
        // player X
        box.innerText = "X";
        box.style.color = colors["X"];
        turn0 = true; // Now the turn of player O.
      }
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  let isDraw = true; // Assume the game is a draw unless we find an empty cell or a winner.
  for (let pattern of winPatterns) {
    let pos1VaL = boxes[pattern[0]].innerText;
    let pos2VaL = boxes[pattern[1]].innerText;
    let pos3VaL = boxes[pattern[2]].innerText;

    if (pos1VaL != "" && pos2VaL != "" && pos3VaL != "") {
      if (pos1VaL === pos2VaL && pos2VaL === pos3VaL) {
        console.log("Winner", pos1VaL);
        showWinner(pos1VaL);
      }
    } else {
      isDraw = false; // If any cell in the winning pattern is empty, it's not a draw yet
    }
  }

  if (isDraw) {
    let allFilled = true;
    for (let box of boxes) {
      if (box.innerText === "") {
        // This indicates that not all boxes are filled, and thus, the game cannot be a draw.
        allFilled = false;
        break;
      }
    }
    if (allFilled) {
      console.log("It's a draw!");
      showDraw();
    }
  }
};

const showDraw = () => {
  alert("It's a draw!");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

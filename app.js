// Grabbing necessary elements
let boxes = document.querySelectorAll(".box");
let rebtn = document.querySelector(".reset");
const modal = document.getElementById("modalResult");
const closeModal = document.querySelector(".close");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restart");
const resultImage = document.getElementById("resultImage");

let first = true; // for first player (true = O, false = X)

// Winning combinations
const wincase = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

// Box click logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent overwriting
    console.log("BOX WAS CLICKED");

    if (first) {
      box.innerText = "O";
      first = false;
    } else {
      box.innerText = "X";
      first = true;
    }

    box.disabled = true; // Disable box after it's used
    checkWinner();
  });
});

// Check for winner or draw
const checkWinner = () => {
  for (let val of wincase) {
    let pos1 = boxes[val[0]].innerText;
    let pos2 = boxes[val[1]].innerText;
    let pos3 = boxes[val[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        let winner = pos1;
        resultMessage.innerText = `Player ${winner} Wins!`;
        resultImage.src = "images/win.jpg"; // Change image as needed
        resultImage.alt = "Player Wins";

        modal.style.display = "flex"; // ✅ Show modal
        disableAllBoxes(); // Prevent further play
        return;
      }
    }
  }

  // Check for draw
  let draw = Array.from(boxes).every((box) => box.innerText !== "");
  if (draw) {
    resultMessage.innerText = `It's a Draw!`;
    resultImage.src = "images/draw.jpg";
    resultImage.alt = "Game draw";
    modal.style.display = "flex"; // ✅ Show modal
  }
};

// Disable all buttons (when game ends)
const disableAllBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Reset button logic
rebtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  first = true;
});

// Restart modal button
restartBtn.onclick = () => {
  modal.style.display = "none"; // Hide modal
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  resultImage.src = "";
  first = true;
};

// Close (X) button on modal
closeModal.onclick = () => {
  modal.style.display = "none"; // Hide modal
  resultImage.src = "";
};

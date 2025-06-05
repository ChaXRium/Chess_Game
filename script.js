// script.js
const board = document.getElementById("chessboard");

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add((row + col) % 2 === 0 ? "white" : "black");
    square.setAttribute("data-row", row);
    square.setAttribute("data-col", col);
    board.appendChild(square);
  }
}

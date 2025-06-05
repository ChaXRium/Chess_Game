const board = document.getElementById("chessboard");

// 2D Array representing initial board setup
const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

// Create the board and place pieces
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add((row + col) % 2 === 0 ? "white" : "black");
    square.setAttribute("data-row", row);
    square.setAttribute("data-col", col);

    const piece = initialBoard[row][col];
    if (piece) {
      square.textContent = piece;
    }

    board.appendChild(square);
  }
}

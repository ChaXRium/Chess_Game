const board = document.getElementById("chessboard");

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

// Track board state and selected square
let selectedSquare = null;

// Draw the board and pieces
function drawBoard() {
  board.innerHTML = ""; // Clear board before redrawing

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

      square.addEventListener("click", handleSquareClick);

      board.appendChild(square);
    }
  }
}

// Handle clicking a square
function handleSquareClick(e) {
  const row = parseInt(e.target.getAttribute("data-row"));
  const col = parseInt(e.target.getAttribute("data-col"));

  if (!selectedSquare) {
    // First click — select piece
    if (initialBoard[row][col] !== "") {
      selectedSquare = { row, col };
      e.target.style.border = "2px solid red";
    }
  } else {
    // Second click — move piece
    const from = selectedSquare;
    const to = { row, col };

    // Move the piece
    initialBoard[to.row][to.col] = initialBoard[from.row][from.col];
    initialBoard[from.row][from.col] = "";

    selectedSquare = null;
    drawBoard();
  }
}

// Initial render
drawBoard();

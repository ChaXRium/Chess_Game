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

let selectedSquare = null;
let currentPlayer = "white"; // 'white' starts first

function drawBoard() {
  board.innerHTML = "";

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

function handleSquareClick(e) {
  const row = parseInt(e.target.getAttribute("data-row"));
  const col = parseInt(e.target.getAttribute("data-col"));

  if (!selectedSquare) {
    const selectedPiece = initialBoard[row][col];
    if (selectedPiece && isCurrentPlayerPiece(selectedPiece)) {
      selectedSquare = { row, col };
      e.target.style.border = "2px solid red";
    }
  } else {
    const from = selectedSquare;
    const to = { row, col };

    const moved = tryMove(from, to);
    if (moved) {
      currentPlayer = currentPlayer === "white" ? "black" : "white";
    }

    selectedSquare = null;
    drawBoard();
  }
}

function isCurrentPlayerPiece(piece) {
  if (currentPlayer === "white") {
    return "♙♖♘♗♕♔".includes(piece);
  } else {
    return "♟︎♜♞♝♛♚".includes(piece);
  }
}

function tryMove(from, to) {
  const piece = initialBoard[from.row][from.col];
  const target = initialBoard[to.row][to.col];

  // Basic pawn move rules
  if (piece === "♙") {
    if (
      from.col === to.col &&
      initialBoard[to.row][to.col] === "" &&
      (to.row === from.row - 1 || (from.row === 6 && to.row === 4))
    ) {
      movePiece(from, to);
      return true;
    }
    if (
      Math.abs(to.col - from.col) === 1 &&
      to.row === from.row - 1 &&
      "♟︎♜♞♝♛♚".includes(target)
    ) {
      movePiece(from, to);
      return true;
    }
  }

  if (piece === "♟︎") {
    if (
      from.col === to.col &&
      initialBoard[to.row][to.col] === "" &&
      (to.row === from.row + 1 || (from.row === 1 && to.row === 3))
    ) {
      movePiece(from, to);
      return true;
    }
    if (
      Math.abs(to.col - from.col) === 1 &&
      to.row === from.row + 1 &&
      "♙♖♘♗♕♔".includes(target)
    ) {
      movePiece(from, to);
      return true;
    }
  }

  // Allow all other pieces to move freely for now (no rules)
  movePiece(from, to);
  return true;
}

function movePiece(from, to) {
  initialBoard[to.row][to.col] = initialBoard[from.row][from.col];
  initialBoard[from.row][from.col] = "";
}

drawBoard();

// Regiões do tabuleiro
const boardRegion = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let turnPlayer = "";

// Jogador da vez
function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

// Botão iniciar
function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  // Reseta o título da página
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>';
  updateTitle();
  boardRegion.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.classList.add("cursor-pointer");
    element.addEventListener("click", handBoardClick);
  });
}

// Função WinRegion
function getWinRegion() {
  const winRegion = [];
  // Se posição 00 for igual 01 e 02 = WIN
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegion.push("0.0", "0.1", "0.2");

  // Se posição 10 for igual 11 e 12 = WIN
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegion.push("1.0", "1.1", "1.2");

  // Se posição 20 for igual 21 e 22 = WIN
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegion.push("2.0", "2.1", "2.2");

  // Se posição 00 for igual 10 e 20 = WIN
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegion.push("0.0", "1.0", "2.0");

  // Se posição 01 for igual 11 e 21 = WIN
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegion.push("0.1", "1.1", "2.1");

  // Se posição 02 for igual 12 e 22 = WIN
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegion.push("0.2", "1.2", "2.2");

  // Se posição 00 for igual 11 e 22 = WIN
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegion.push("0.0", "1.1", "2.2");

  // Se posição 02 for igual 11 e 20 = WIN
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegion.push("0.2", "1.1", "2.0");
  return winRegion;
}

// Função desabilitar a região do span
function disableSpan(element) {
  element.style.cursor = "default";
  element.removeEventListener("click", handBoardClick);
}

function handBoardClick(ev) {
  // Obtém a região clicada
  const span = ev.currentTarget;
  let region = span.dataset.region;
  let rowColPair = region.split(".");
  let row = rowColPair[0];
  let col = rowColPair[1];
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][col] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][col] = "O";
  }
  console.clear();
  console.table(vBoard);

  // Disabilitar região do span
  disableSpan(span);

  // Verifica vencedor
  let winRegion = getWinRegion;
  if (winRegion.length > 0) {
    console.log("Vencedor");
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empatou!";
  }
}
document.getElementById("start").addEventListener("click", initializeGame);

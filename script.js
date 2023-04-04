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
}
document.getElementById("start").addEventListener("click", initializeGame);

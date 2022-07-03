function generateBoard() {
    let boardSize = prompt("Enter board size:", 4);
    let body = document.body;
    body.innerHTML = "";
    let board = document.createElement("div");
    board.className = "board";
    let boardPrecent = `${100 / boardSize}% `.repeat(boardSize);
    board.style.gridTemplateColumns = boardPrecent;
    board.style.gridTemplateRows = boardPrecent;

    let items = [];
    for (let i = 1; i <= boardSize * boardSize - 1; i++) {
        items[i] = document.createElement("div");
        items[i].className = "board-item";
        items[i].textContent = i;
        board.appendChild(items[i])
    }

    body.appendChild(board);
}
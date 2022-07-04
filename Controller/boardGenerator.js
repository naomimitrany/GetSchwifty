var boardItems = [];
var boardSize;
var board;

function generateBoard() {
    boardSize = Number(prompt("Enter board size:", 4));
    board = createBoard();
    addItems(getOrder());
    displayItems();
    addEmptyTile();
    document.body.appendChild(board);
}

function createBoard() {
    let body = document.body;
    body.innerHTML = "";
    let board = document.createElement("div");
    board.className = "board";
    let boardPrecent = `${100 / boardSize}% `.repeat(boardSize);
    board.style.gridTemplateColumns = boardPrecent;
    board.style.gridTemplateRows = boardPrecent;

    return board;
}

function getOrder() {
    let order = Array.from(Array(boardSize * boardSize - 1).keys());
    do {
        shuffleArray(order);
    } while (!isSolveable(order));

    return order;
}

function addItems(order) {
    for (let i of order) {
        boardItems[i] = document.createElement("div");
        boardItems[i].className = "board-item";
        boardItems[i].textContent = order[i] + 1;
        boardItems[i].id = order[i] + 1;
        boardItems[i].addEventListener("click", () => onMove(i))
    }
}

function displayItems() {
    board.innerHTML = "";
    boardItems.forEach(item => board.appendChild(item));
}

function addEmptyTile() {
    let emptyItem = document.createElement("div");
    emptyItem.className = "empty";
    boardItems[boardItems.length] = emptyItem;
    board.appendChild(emptyItem);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isSolveable(order, rows) {
    let swaps = 0;
    for (let i = 0; i < order.length; i++) {
        for (let j = i; j < order.length - i; j++) {
            if (order[j] < order[i]) {
                swaps++;
            }
        }
    }

    if (rows % 2 != 0) {
        return swaps % 2 == 0;
    }
    return (swaps + rows) % 2 == 0;
}

function onMove(i) {
    if (i - 1 >= 0 && i - 1 % boardSize != 1 && boardItems[i - 1].className == "empty") {
        switchTiles(i, i - 1);
    }

    else if (i + 1 < boardItems.length && i + 1 % boardSize != boardItems - 1 && boardItems[i + 1].className == "empty") {
        switchTiles(i, i + 1);
    }

    else if (i - boardSize >= 0 && boardItems[i - boardSize].className == "empty") {
        switchTiles(i, i - boardSize);
    }

    else if (i + boardSize < boardItems.length && (boardItems[i + boardSize].className == "empty")) {
        switchTiles(i, i + boardSize);
    }
}

function switchTiles (i1, i2) {
    let temp = boardItems[i1].cloneNode(true);
    boardItems[i1] = boardItems[i2].cloneNode(true);
    boardItems[i2] = temp;
    boardItems[i1].addEventListener("click", () => onMove(i1));
    boardItems[i2].addEventListener("click", () => onMove(i2));
    displayItems()
}

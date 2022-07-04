var boardItems;
var boardSize;
var board;

function generateBoard() {
    document.body.style.flexDirection = "row";
    boardSize = Number(prompt("Enter board size:", 4));
    createBoard();
    addItems(getOrder());
    displayItems();
    addEmptyTile();
    document.body.appendChild(board);
    addImages()
}

function createBoard() {
    let body = document.body;
    body.innerHTML = "";
    board = document.createElement("div");
    board.className = "board";
    let boardPrecent = `${100 / boardSize}% `.repeat(boardSize);
    board.style.gridTemplateColumns = boardPrecent;
    board.style.gridTemplateRows = boardPrecent;
}

function addImages() {
    let morty = document.createElement("img");
    morty.src = "..\\Model\\morty.png";
    morty.style.width = "auto";
    morty.style.height = "50%";
    morty.id = "morty";

    let rick = document.createElement("img");
    rick.src = "..\\Model\\rick.png";
    rick.style.width = "auto";
    rick.style.height = "50%";
    rick.id = "rick";

    document.body.insertBefore(morty, board);
    document.body.appendChild(rick, board);
}

function getOrder() {
    let order = Array.from(Array(boardSize * boardSize - 1).keys());
    do {
        shuffleArray(order);
    } while (!isSolveable(order));

    return order;
}

function addItems(order) {
    boardItems = []
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
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isSolveable(order) {
    let swaps = 0;
    for (let i = 0; i < order.length; i++) {
        for (let j = i + 1; j < order.length; j++) {
            if (order[j] < order[i]) {
                swaps++;
            }
        }
    }

    if (boardSize % 2 != 0) {
        return swaps % 2 == 0;
    }
    return (swaps + boardSize) % 2 == 0;
}

function onMove(i) {
    if (i - 1 >= 0 && i % boardSize != 0 && boardItems[i - 1].className == "empty") {
        switchTiles(i, i - 1);
    }

    else if (i + 1 < boardItems.length && i % boardSize != boardSize - 1 && boardItems[i + 1].className == "empty") {
        switchTiles(i, i + 1);
    }

    else if (i - boardSize >= 0 && boardItems[i - boardSize].className == "empty") {
        switchTiles(i, i - boardSize);
    }

    else if (i + boardSize < boardItems.length && (boardItems[i + boardSize].className == "empty")) {
        switchTiles(i, i + boardSize);
    }

    else {
        return;
    }
    
    displayItems();
    if (hasWon()) {
        win();
        setTimeout( () => {generateBoard();}, 20);
    }
}

function switchTiles (i1, i2) {
    let temp = boardItems[i1].cloneNode(true);
    boardItems[i1] = boardItems[i2].cloneNode(true);
    boardItems[i2] = temp;
    boardItems[i1].addEventListener("click", () => onMove(i1));
    boardItems[i2].addEventListener("click", () => onMove(i2));
}

function hasWon() {
    for (let i = 0; i < boardItems.length - 1; i++) {
        if (i + 1 != boardItems[i].id)
        {
            return false;
        }
    }
    return true
}

function win() {
    document.getElementById("rick").src = "..\\Model\\happy-rick.png";
    document.getElementById("morty").src = "..\\Model\\happy-morty.png";

    setTimeout(() => alert("WOHOOO YOU WON!!"), 20);
}



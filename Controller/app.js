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
    let order = Array.from(Array(boardSize * boardSize - 1).keys());
    do {
        shuffleArray(order);
        console.log("hi");
    } while (!isSolveable(order));

    console.log(order);
    for (let i of order) {
        items[i] = document.createElement("div");
        items[i].className = "board-item";
        items[i].textContent = order[i] + 1;
        board.appendChild(items[i]);
    }

    let emptyItem = document.createElement("div");
    emptyItem.className = "empty";
    body.appendChild(emptyItem);

    body.appendChild(board);
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
    // empty square is always at the end so if rows are even board is always solveable
    return true;
}

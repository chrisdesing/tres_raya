const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            cells[a].classList.add('win'); // Añade clase de animación
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `¡Jugador ${currentPlayer} ha ganado! 🎉`;
        isGameActive = false;
        playSound('win'); // Llama al sonido de victoria
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = '¡Es un empate!';
        isGameActive = false;
        playSound('tie'); // Llama al sonido de empate
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turno del jugador ${currentPlayer}`;
};

// const handleCellClick = (e) => {
//     const clickedCell = e.target;
//     const cellIndex = clickedCell.getAttribute('data-index');

//     if (board[cellIndex] !== '' || !isGameActive) {
//         return;
//     }

//     board[cellIndex] = currentPlayer;
//     clickedCell.textContent = currentPlayer;

//     checkWin();
// };
const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('occupied'); // Animación de aparición

    // Añadir clase específica para el jugador actual
    clickedCell.classList.add(currentPlayer === 'X' ? 'playerX' : 'playerO');

    checkWin();
};



const restartGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusText.textContent = `Turno del jugador ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win'); // Elimina la animación de victoria
    });
};

const playSound = (type) => {
    let sound = new Audio();
    sound.src = type === 'win' ? 'win-sound.mp3' : 'tie-sound.mp3';
    sound.play();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusText.textContent = `Turno del jugador ${currentPlayer}`;

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = (() => {
        const board = [null, null, null, null, null, null, null, null, null];

        const getBoard = () => board;
        const markSpot = (index, player) => {
            if (board[index] === null) {
                board[index] = player.getMark();
                return true;
            } else {
                return false;
            }
        }

        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const checkWin = () => {
            for (let i = 0; i < winConditions.length; i++) {
                const condition = winConditions[i];
                const [cellA, cellB, cellC] = condition.map(index => board[index]);

                if (cellA === cellB && cellB === cellC && cellA !== null) {
                    return true;
                }
            }
            return false;
        }

        const checkTie = () => !board.includes(null);

        const resetBoard = () => {
            board.fill(null);
        }

        return { getBoard, markSpot, checkWin, checkTie, resetBoard }
    })();

    const playerModule = ((name, mark) => {
        const getName = () => name;
        const getMark = () => mark;
        return { getName, getMark }
    });

    const game = (() => {
        const player1 = playerModule("Player 1", "X");
        const player2 = playerModule("Player 2", "O");

        let currentPlayer = player1;
        let gameOver = false;

        const switchPlayer = () => currentPlayer = (currentPlayer === player1) ? player2 : player1;

        const playTurn = (index) => {
            console.log('playTurn called');
            if (!gameOver) {
                console.log('Game is not over');
                if (gameBoard.markSpot(index, currentPlayer)) {
                    console.log('Spot marked successfully');
                    if (gameBoard.checkWin()) {
                        console.log('Game won');
                        gameOver = true;
                    } else if (gameBoard.checkTie()) {
                        console.log('Game tied');
                        gameOver = true;
                    } else {
                        switchPlayer();
                    }
                }
            }
        };

        const restartGame = () => {
            gameBoard.resetBoard();
            gameOver = false;
            currentPlayer = player1;
            displayController.updateBoard();
        }

        return { playTurn, restartGame, gameOver, currentPlayer };
    })();

    const displayController = (() => {
        const boardElements = document.querySelectorAll('.cell');
        const restartBtn = document.querySelector('.restart');
        const resultDiv = document.getElementById('result');

        boardElements.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                console.log('Cell clicked at index:', index);
                if (!gameBoard.getBoard()[index] && !game.gameOver) {
                    game.playTurn(index);
                    updateBoard();
                }
            });
        });

        restartBtn.addEventListener('click', () => {
            console.log('Restart button clicked');
            game.restartGame();
            updateBoard();
        });

        const updateBoard = () => {
            const currentBoard = gameBoard.getBoard();
            boardElements.forEach((cell, index) => {
                cell.textContent = currentBoard[index] || '';
            });

            if (gameBoard.checkWin()) {
                resultDiv.textContent = `${game.currentPlayer.getName()} wins!`;
            } else if (gameBoard.checkTie()) {
                resultDiv.textContent = "It's a tie!";
            } else {
                resultDiv.textContent = "";
            }
        };

        return { updateBoard };
    })();
});

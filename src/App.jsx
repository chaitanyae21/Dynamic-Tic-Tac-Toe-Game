import React, { useState } from 'react';
import TicTacToeBoard from './components/TicTacToeBoard';
import './App.css';

// Main application component. Accepts numBoards prop to render multiple boards.
// Each board maintains its own state (cells, turn, winner). A simple bot plays 'O' moves.
const App = ({ numBoards = 1 }) => {
  // Helper to initialize a single board
  const initBoard = () => ({
    cells: Array(9).fill(null),
    isXNext: true,
    winner: null,
  });

  // State: array of boards
  const [boards, setBoards] = useState(Array.from({ length: numBoards }, initBoard));

  // Determine winner for given cells
  const calculateWinner = (cells) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };

  // Check if board is full
  const isBoardFull = (cells) => cells.every((cell) => cell != null);

  // Simple bot move: choose random empty cell
  const botMove = (cells) => {
    const empty = [];
    cells.forEach((v, idx) => {
      if (!v) empty.push(idx);
    });
    if (empty.length === 0) return cells;
    const move = empty[Math.floor(Math.random() * empty.length)];
    const newCells = cells.slice();
    newCells[move] = 'O';
    return newCells;
  };

  // Handle a cell click on a specific board
  const handleClick = (boardIndex, cellIndex) => {
    setBoards((prevBoards) =>
      prevBoards.map((board, idx) => {
        if (idx !== boardIndex) return board;
        const { cells, isXNext, winner } = board;
        if (winner || cells[cellIndex]) return board;

        const newCells = cells.slice();
        newCells[cellIndex] = isXNext ? 'X' : 'O';
        let newWinner = calculateWinner(newCells);
        let nextIsX = !isXNext;

        let updatedCells = newCells;

        // If human played (X) and no winner yet, let bot play automatically
        if (isXNext && !newWinner && !isBoardFull(newCells)) {
          updatedCells = botMove(newCells);
          newWinner = calculateWinner(updatedCells);
          nextIsX = true; // back to human's turn
        }

        return {
          cells: updatedCells,
          isXNext: nextIsX,
          winner: newWinner,
        };
      })
    );
  };

  // Reset all boards
  const restart = () => {
    setBoards(Array.from({ length: numBoards }, initBoard));
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe Game</h1>
      <button className="restart-button" onClick={restart}>Restart Game</button>
      <div className="boards">
        {boards.map((board, idx) => (
          <div key={idx} className="board-wrapper">
            <TicTacToeBoard
              cells={board.cells}
              onCellClick={(cellIndex) => handleClick(idx, cellIndex)}
            />
            {board.winner && <div className="status">Winner: {board.winner}</div>}
            {!board.winner && isBoardFull(board.cells) && <div className="status">Draw</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

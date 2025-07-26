import React from 'react';
import './TicTacToeBoard.css';

function TicTacToeBoard({ cells, onCellClick, winner, boardIndex }) {
  const renderCell = (i) => (
    <button
      key={i}
      className="cell"
      onClick={() => onCellClick(boardIndex, i)}
      disabled={Boolean(cells[i] || winner)}
    >
      {cells[i]}
    </button>
  );

  return (
    <div className="board-container">
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {renderCell(row * 3 + 0)}
            {renderCell(row * 3 + 1)}
            {renderCell(row * 3 + 2)}
          </div>
        ))}
      </div>
      {winner && <div className="board-winner">Winner: {winner}</div>}
    </div>
  );
}

export default TicTacToeBoard;

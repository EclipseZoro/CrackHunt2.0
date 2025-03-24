import { useState } from "react";
import { checkGameStatus, submitGameResult } from "./api";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("Your turn!");

  const handleClick = async (index) => {
    if (board[index] || status !== "Your turn!") return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameStatus = checkGameStatus(newBoard);
    if (gameStatus) {
      setStatus(gameStatus);
      if (gameStatus === "You won!") await submitGameResult();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-16 h-16 flex items-center justify-center bg-gray-200 text-2xl font-bold border"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <p className="text-lg font-semibold">{status}</p>
    </div>
  );
};

export default TicTacToe;

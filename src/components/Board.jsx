import Square from "./Square";
import { useState, useEffect } from "react";

 function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [value, setValue] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [player, setPlayer] = useState([]);
  const [move, setMove] = useState(true);

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

  const handleResetClick = () => {
    setSquares(Array(9).fill(null));
    setHistory([]);
    setWinner(null);
  };

  const handleClick = (i) => {
    if (squares[i] === null && winner === null && move) {
      const nextSquares = squares.slice();
      nextSquares[i] = value ? "X" : "O";
      setPlayer([...player, nextSquares[i]]);
      setSquares(nextSquares);
      setHistory([...history, nextSquares]);
      setValue(!value);
    }
  };

  useEffect(() => {
    for (let i of lines) {
      if (
        squares[i[0]] === squares[i[1]] &&
        squares[i[0]] === squares[i[2]] &&
        squares[i[0]] !== null
      ) {
        setWinner(squares[i[1]]);
      }
    }
  }, [squares]);
  useEffect(() => {}, [history]);

  const renderSquare = (i) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };

  const handleHistoryCick = (index) => {
    setSquares(history[index]);
    // if (index === history.length - 1) {
    //   setMove(true);
    // } else {
    //   setMove(false);
    // }
    index !== history.length - 1 ? setMove(false) : setMove(true);
  };

  return (
    <>
      <div className="">
        <div className="title">
          <h2 className=" text-xl flex justify-center items-center">The Tic Tac Toe Game</h2>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex  gap-5 sm:flex-row flex-col ">
            <div className="sm:w-[50%]">
              <div className="board-row px-3 py-5 mb-8 winner">
                {winner
                  ? `Winner : Player ${winner}`
                  : history.length == 9
                  ? "Draw"
                  : value
                  ? "Next Player : X"
                  : "Next Player : O"}
              </div>
              <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
              </div>
              <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
              </div>
              <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
              </div>
              <div className="board-row  mt-5">
                <button
                  className="!bg-slate-800 text-[#ababab] reset-button"
                  onClick={handleResetClick}
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="px-5 sm:w-[50%]">
              <h2 className=" flex justify-center items-center w-full winner h-[63px] py-5 mb-5">
                Moves
              </h2>
              {history.map((item, index) => (
                <div className="board-row" key={index}>
                  <div>
                    <button
                      className="bg-gray-500 text-white p-1 mt-1"
                      onClick={() => handleHistoryCick(index)}
                    >
                      Go to Move No. #{index + 1}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="board-row ">{history}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
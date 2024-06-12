import React, {useState, useRef, useEffect} from 'react';
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [turn, setTurn] = useState<"X" | "O">(() => (Math.random() < 0.5 ? "X" : "O"));
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gameMode, setGameMode] = useState<"PvP" | "PvC">("PvP");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const box1 = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement | null>(null);
  const box3 = useRef<HTMLDivElement | null>(null);
  const box4 = useRef<HTMLDivElement | null>(null);
  const box5 = useRef<HTMLDivElement | null>(null);
  const box6 = useRef<HTMLDivElement | null>(null);
  const box7 = useRef<HTMLDivElement | null>(null);
  const box8 = useRef<HTMLDivElement | null>(null);
  const box9 = useRef<HTMLDivElement | null>(null);

  const box_arr = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  useEffect(() => {
    // Randomly set the first turn when the component mounts or resets
    setTurn(Math.random() < 0.5 ? "X" : "O");
  }, []);

  const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    if (lock || data[num] !== "") {
      return;
    }

    if (turn === "X") {
      e.currentTarget.innerHTML = `<img src=${cross_icon} alt="cross" />`;
      data[num] = "x";
      setTurn("O");
    } else {
      e.currentTarget.innerHTML = `<img src=${circle_icon} alt="circle" />`;
      data[num] = "o";
      setTurn("X");
    }
    setCount(count + 1);
    checkWin();
    if (gameMode === "PvC" && turn === "X" && !lock) {
      setTimeout(computerTurn, 500);
    }
  }

  const computerTurn = () => {
    if (lock || count >= 9) {
      return;
    }

    const availableMoves = data.map((val, index) => (val === "" ? index : -1)).filter(index => index !== -1);
    if (availableMoves.length > 0) {
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      if (box_arr[move].current) {
        box_arr[move]!.current!.innerHTML = `<img src=${circle_icon} alt="circle" />`;
        data[move] = "o";
        setTurn("X");
        setCount(count + 1);
        checkWin();
      }
    }
  }

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a], combination);
        return;
      }
    }

    if (count === 8) {
      draw();
    }
  }

  const won = (winner: string, combination: number[]) => {
    setLock(true);
    if (titleRef.current) {
      if (winner === "x") {
        titleRef.current.innerHTML = "Cross Won!";
        setScoreX(scoreX + 1);
      } else {
        titleRef.current.innerHTML = "Circle Won!";
        setScoreO(scoreO + 1);
      }
    }
    combination.forEach(index => {
      if (box_arr[index].current) {
        box_arr[index]!.current!.classList.add("highlight");
      }
    });
  }

  const draw = () => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = "It's a Draw!";
      setDraws(draws + 1);
    }
  }

  const reset = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setLock(false);
    setTurn(Math.random() < 0.5 ? "X" : "O");
    if (titleRef.current) {
      titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React + TSX</span>";
    }
    setCount(0);
    box_arr.forEach((box) => {
      if (box.current) {
        box.current.innerHTML = "";
        box.current.classList.remove("highlight");
      }
    });
  }

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React + TSX</span></h1>
      <div className="scores">
        <div>X Wins: {scoreX}</div>
        <div>O Wins: {scoreO}</div>
        <div>Draws: {draws}</div>
      </div>
      <div className="turn">Turn: {turn}</div>
      <div className="game-mode">
        <label htmlFor="gameMode">Game Mode:</label>
        <select id="gameMode" value={gameMode} onChange={(e) => setGameMode(e.target.value as "PvP" | "PvC")}>
          <option value="PvP">Player vs Player</option>
          <option value="PvC">Player vs Computer</option>
        </select>
      </div>
      <div className="board">
        <div className="boxes" ref={box1} onClick={(e) => {toggle(e, 0)}}></div>
        <div className="boxes" ref={box2} onClick={(e) => {toggle(e, 1)}}></div>
        <div className="boxes" ref={box3} onClick={(e) => {toggle(e, 2)}}></div>
        <div className="boxes" ref={box4} onClick={(e) => {toggle(e, 3)}}></div>
        <div className="boxes" ref={box5} onClick={(e) => {toggle(e, 4)}}></div>
        <div className="boxes" ref={box6} onClick={(e) => {toggle(e, 5)}}></div>
        <div className="boxes" ref={box7} onClick={(e) => {toggle(e, 6)}}></div>
        <div className="boxes" ref={box8} onClick={(e) => {toggle(e, 7)}}></div>
        <div className="boxes" ref={box9} onClick={(e) => {toggle(e, 8)}}></div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
}

export default TicTacToe;

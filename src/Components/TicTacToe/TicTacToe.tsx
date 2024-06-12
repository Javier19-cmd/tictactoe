import React, {useState, useRef} from 'react';
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef<HTMLHeadingElement | null>(null);
  let box1 = useRef<HTMLDivElement | null>(null);
  let box2 = useRef<HTMLDivElement | null>(null);
  let box3 = useRef<HTMLDivElement | null>(null);
  let box4 = useRef<HTMLDivElement | null>(null);
  let box5 = useRef<HTMLDivElement | null>(null);
  let box6 = useRef<HTMLDivElement | null>(null);
  let box7 = useRef<HTMLDivElement | null>(null);
  let box8 = useRef<HTMLDivElement | null>(null);
  let box9 = useRef<HTMLDivElement | null>(null);

  let box_arr = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    if (lock || data[num] !== "") {
      return;
    }

    if (count % 2 === 0) {
      e.currentTarget.innerHTML = `<img src=${cross_icon} alt="cross" />`;
      data[num] = "x";
    } else {
      e.currentTarget.innerHTML = `<img src=${circle_icon} alt="circle" />`;
      data[num] = "o";
    }
    setCount(count + 1);
    checkWin();
  }

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== ""){
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== ""){
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== ""){
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== ""){
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== ""){
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== ""){
      won(data[8]);
    }else if (data[2] === data[4] && data[4] === data[6] && data[6] !== ""){
      won(data[6]);
    }else if (data[2] === data[4] && data[4] === data[6] && data[6] !== ""){
      won(data[2]);
    }
  }

  const won = (winner: string) => {
    setLock(true);
    if (titleRef.current) {
      if (winner === "x") {
        titleRef.current.innerHTML = "Cross Won!";
      } else {
        titleRef.current.innerHTML = "Circle Won!";
      }
    }
  }

  const reset = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setLock(false);
    if (titleRef.current) {
      titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React + TSX</span>";
    }
    setCount(0);
    box_arr.forEach((box) => {
      if (box.current) {
        box.current.innerHTML = "";
      }
    });
  }

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React + TSX</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => {toggle(e, 0)}}></div>
          <div className="boxes" ref={box2} onClick={(e) => {toggle(e, 1)}}></div>
          <div className="boxes" ref={box3} onClick={(e) => {toggle(e, 2)}}></div>
        </div>

        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => {toggle(e, 3)}}></div>
          <div className="boxes" ref={box5} onClick={(e) => {toggle(e, 4)}}></div>
          <div className="boxes" ref={box6} onClick={(e) => {toggle(e, 5)}}></div>
        </div>

        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => {toggle(e, 6)}}></div>
          <div className="boxes" ref={box8} onClick={(e) => {toggle(e, 7)}}></div>
          <div className="boxes" ref={box9} onClick={(e) => {toggle(e, 8)}}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
}

export default TicTacToe;

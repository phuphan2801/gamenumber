import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import Points from "./Points";
import css from "../css/App.module.css";


const Game = () => {
  const [points, setPoints] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");
  const [positions, setPositions] = useState([]);
  const timerRef = useRef(null);

  const randomPositions = (points) => {
    return Array.from({ length: points }, () => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    }));
  };

  const resetGame = () => {
    setSequence([]);
    setNextNumber(1);
    setStatus("");
    setPositions([]);
    setIsPlaying(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  const handleStart = () => {
    if (points <= 0) {
      setError("error");
      return;
    }
    setError("");

    resetGame(); // Reset lại toàn bộ trạng thái trước khi bắt đầu trò chơi mới

    const newSequence = Array.from({ length: points }, (_, i) => ({
      number: i + 1,
      isClicked: false,
    }));
    setSequence(newSequence); // Tạo lại sequence mới
    setPositions(randomPositions(points)); // Tạo lại vị trí ngẫu nhiên mới
    setIsPlaying(true);

    // Start the timer
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 100);
  };

  const handleNumberClick = (number) => {
    if (number === nextNumber) {
      setSequence((prevSequence) =>
        prevSequence.map((item) =>
          item.number === number ? { ...item, isClicked: true } : item
        )
      );
      setNextNumber(nextNumber + 1);
      if (nextNumber === points) {
        setStatus("ALL CLEARED");
        setIsPlaying(false);
        clearInterval(timerRef.current);
      }
    } else {
      setStatus("GAME OVER");
      setIsPlaying(false);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className='gameContainer'>
      {status && (
        <div
          className={`${css.status} ${
            status === "ALL CLEARED" ? css.success : css.fail
          }`}
        >
          {status}
        </div>
      )}
      {error && <div className={css.error}>{error}</div>}
      <h2>LET'S PLAY</h2>
      <Points
        points={points}
        setPoints={setPoints}
        onStart={handleStart}
        isPlaying={isPlaying}
      />
      <div className={css.label}>Time: {time.toFixed(1)} s</div>

      <div className={css.play}>
        {sequence.map((item, index) => (
          <Button
            key={item.number}
            number={item.number}
            position={positions[index]}
            onClick={handleNumberClick}
            isClicked={item.isClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
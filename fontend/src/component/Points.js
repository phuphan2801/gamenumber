import React from "react";
import css from "../css/App.module.css";

const Points = ({ points, setPoints, onStart, isPlaying }) => {
  return (
    <div className={css.controlPanel}>
      <label className={css.label}>
        Points:
        <input
          type="number"
          className={css.input}
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
          disabled={isPlaying}
          min={0}
        />
      </label>
      <button
        className={css.button}
        onClick={onStart}
        disabled={points <= 0}
      >
        {isPlaying ? "Restart" : "Play"}
      </button>
    </div>
  );
};

export default Points;

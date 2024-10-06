import React from "react";
import css from "../css/App.module.css";
const Button = ({ number, position, onClick, isClicked }) => {
  const handleClick = () => {
    if (!isClicked) {
      onClick(number);
    }
  };

  return (
    <button
      className={`${css.numberButton} ${isClicked ? css.active : ""}`}
      style={position}
      onClick={handleClick}
      disabled={isClicked}
    >
      {number}
    </button>
  );
};

export default Button;

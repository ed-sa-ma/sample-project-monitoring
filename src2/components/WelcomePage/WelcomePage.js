import React from "react";

import "./welcomPage.css";

export default function WelcomePage({ fullPage, onClickEnterButton }) {
  return (
    <div className={`welcomePage ${fullPage ? "" : "welcomePage--collapsed"}`}>
      <h1 className="welcomePage__header">CPU Monitoring App</h1>
      <button className="welcomePage__button" onClick={onClickEnterButton}>
        ENTER
      </button>
    </div>
  );
}

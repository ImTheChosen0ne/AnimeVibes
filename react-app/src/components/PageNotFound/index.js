import React from "react";
import { useHistory } from "react-router-dom";
import logo from "./animevibeslogo.png";
import "./PageNotFound.css";

function PageNotFound() {
  const history = useHistory()
  const handleSubmit = () => {
    history.push("/")
  }

  return (
    <div className="not-found">
      <div className="fourohfour">
        <h1>4</h1>
        <img src={logo} alt="404"/>
        <h1>4</h1>
      </div>
      <h3>Check out more trending videos</h3>
      <button onClick={handleSubmit}>
        Watch now
      </button>
    </div>
  );
}

export default PageNotFound;

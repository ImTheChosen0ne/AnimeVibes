import React from "react";
import { NavLink } from "react-router-dom";

import "./SplashSideBar.css";

const SplashSideBar = () => {
  return (
    <div className="side-bar-container">
      <div>
        <ul className="side-bar-links">
          <li>
            <NavLink exact to="/">
              For you
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/">
              Following
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="followers">
        <h5>Following accounts</h5>
      </div>
      <div className="footer">
        About info
      </div>
    </div>
  );
};

export default SplashSideBar;

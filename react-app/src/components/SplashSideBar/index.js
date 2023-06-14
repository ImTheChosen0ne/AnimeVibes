import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./SplashSideBar.css";

const SplashSideBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="side-bar-container">
      <div>
        <ul className="side-bar">
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
      <div className="footer">
        About info
      </div>
    </div>
  );
};

export default SplashSideBar;

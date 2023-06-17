import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./SplashSideBar.css";

const SplashSideBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
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
        {sessionUser?.followers.map((user) => (
          <div key={user.id} className="followers">
            {user.username}
          </div>
        ))}
      </div>
      <div className="footer">
        About info
      </div>
    </div>
  );
};

export default SplashSideBar;

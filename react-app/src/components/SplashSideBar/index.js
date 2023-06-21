import React, { useState, ulRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

import "./SplashSideBar.css";

const SplashSideBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

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
        {sessionUser ? (
          <div>
            <h5>Following accounts</h5>
            {sessionUser.followers.length > 0 ? (
              sessionUser.followers.slice(0, 10).map((user) => (
                <NavLink to={`/users/profile/${user.id}`}>
                  <div key={user.id} className="follower">
                    <div className="splash-img">
                      <img src={user.profile_pic} className="side-img" />
                    </div>
                    <div className="sidebar-name">
                      <div className="username">{user.username}</div>
                      <div className="name">
                        {user.name === "Set a profile name." ? "" : user.name}
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))
            ) : (
              <div>Start following users today!</div>
            )}
          </div>
        ) : (
          <div className="sidebar-login">
            <div>
              <p>Log in to follow creators, like videos, and view comments</p>
            </div>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </div>
        )}
      </div>
      <div className="footer">About info</div>
    </div>
  );
};

export default SplashSideBar;

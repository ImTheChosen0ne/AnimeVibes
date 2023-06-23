import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

import "./SplashSideBar.css";

const SplashSideBar = () => {
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

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
            <NavLink exact to="/following">
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
                      <img src={user.profile_pic} className="side-img" alt="user"/>
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
      <div className="footer">
      <div className="about">
          <h3>
            <i className="fa-regular fa-copyright"></i>2023 AnimeVibes inspired by TikTok
          </h3>
        </div>
          <div>
            <p>Matthew Almeida</p>
            <a href="https://github.com/ImTheChosen0ne">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/matthew-almeida-103425183/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      <div>
        <div>
        <div>
          <div>Made with:</div>
          <div className="madeIcons">
            <i className="fa-brands fa-react"></i>
            <i className="fa-brands fa-html5"></i>
            <i className="fa-brands fa-css3-alt"></i>
            <i className="fa-brands fa-square-js"></i>
            <i className="fa-brands fa-python"></i>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default SplashSideBar;

import React, {useState, ulRef} from "react";
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
          <>
            <h5>Following accounts</h5>
            {sessionUser.followers.slice(0, 10).map((user) => (
              <div key={user.id} className="follower">
                <div className="splash-img">
                  <img src={user.profile_pic} className="side-img" />
                </div>
                {user.username}
              </div>
            ))}
          </>
        ) : (
          <OpenModalButton
          buttonText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
        )}
      </div>
      <div className="footer">About info</div>
    </div>
  );
};

export default SplashSideBar;

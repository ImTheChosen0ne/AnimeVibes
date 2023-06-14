import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleCreatePost = () => {
    history.push("/posts/new");
  };

  return (
    <div className="nav-container">
      <ul className="nav">
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
		<div className="nav-links">
        <li className={sessionUser ? "" : "hidden"}>
            <button className="upload" onClick={handleCreatePost}>+ Upload</button>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
		</div>
      </ul>
    </div>
  );
}

export default Navigation;

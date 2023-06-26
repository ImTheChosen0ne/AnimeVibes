import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import animevibesLogo from "./AnimeVibesnewnoTM.jpg"
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreatePost = () => {
    history.push("/posts/new");
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowDropdown(value.length > 0);
  };

  const displayDropdownMessage = () => {
    if (showDropdown) {
      return <div className="dropdown">Feature Coming Soon!</div>;
    }
    return null;
  };

  return (
    <div className="nav-container">
      <ul className="nav">
        <li>
          <NavLink exact to="/">
            <img src={animevibesLogo} alt="logo" className="logo"/>
          </NavLink>
        </li>
        <li className="nav-search">
          <form>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <button disabled={true}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          {displayDropdownMessage()}
        </li>
        <div className="nav-links">
          <li className={sessionUser ? "" : "hidden"}>
            <button className="upload" onClick={handleCreatePost}>
              + Upload
            </button>
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

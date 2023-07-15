import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import animevibesLogo from "./AnimeVibesnewnoTM.jpg";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const users = Object.values(useSelector((state) => state.users));
  const posts = Object.values(useSelector((state) => state.posts));

  const handleCreatePost = () => {
    history.push("/posts/new");
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowDropdown(value.length > 0);
    performSearch(value);
  };

  const performSearch = (value) => {
    const filteredPosts = posts.filter((post) =>
      post.caption.toLowerCase().includes(value.toLowerCase())
    );
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    const results = [...filteredPosts, ...filteredUsers];
    setSearchResults(results);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?query=${searchValue}`);
    setSearchValue("");
  };

  const renderSearchResults = () => {
    // if (searchResults.length === 0) {
    //   return <li>No results found.</li>;
    // }

    let usersList = null;
    const filteredResults = searchResults.filter(
      (result) => !result.caption && result.id !== sessionUser?.id
    );

    if (filteredResults.length > 0) {
      usersList = (
        <div className="search-accounts">
          <h4>Accounts</h4>
          <ul>
            {filteredResults.map((result) => (
              <li key={result.id}>
                <NavLink to={`/users/profile/${result.id}`} className="search-user">
                  <img src={result.profile_pic} alt="user"/>
                  <p>{result.username}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <ul>
        <NavLink exact to={`/search?query=${searchValue}`} className="search-value">
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>{searchValue}</p>
        </NavLink>
        {usersList}
      </ul>
    );
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-container">
      <ul className="nav">
        <li>
          <NavLink exact to="/">
            <img src={animevibesLogo} alt="logo" className="logo" />
          </NavLink>
        </li>
        <li className="nav-search">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchInputChange}
              ref={searchRef}
            />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          {showDropdown && (
            <ul className="dropdown">{renderSearchResults()}</ul>
          )}
        </li>
        <div className="nav-links">
          <li className={sessionUser ? "" : "hidden"}>
            <button className="upload" onClick={handleCreatePost}>
              + Upload
            </button>
          </li>
          <li className={sessionUser ? "" : "hidden"}>
            <NavLink
              exact
              to={`/users/${sessionUser?.id}/messages`}
              className="message-icon"
            >
              <i className="fa-regular fa-message"></i>
            </NavLink>
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

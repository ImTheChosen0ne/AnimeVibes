import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addFavoriteThunk, deleteFavoriteThunk } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const FavoriteButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const ulRef = useRef();

  let [favoriteColor, setfavoriteColor] = useState("");

  if (!sessionUser) favoriteColor = "";

  if (sessionUser?.user_favorites) {
    for (let favorite of sessionUser?.user_favorites) {
      if (favorite.id === post?.id) favoriteColor = "yellowFavorite";
    }
  }

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

  const handleFavorite = async () => {
    if (favoriteColor === "yellowFavorite") {
      await dispatch(deleteFavoriteThunk(post.id, sessionUser.id));
      setfavoriteColor("");
    } else if (favoriteColor === "") {
      await dispatch(addFavoriteThunk(post?.id, sessionUser?.id));
      setfavoriteColor("yellowFavorite");
    }
  };

  return (
    <div className={`favorite-button ${favoriteColor}`}>
      {!sessionUser ? (
        <OpenModalButton
          buttonText={
            <div className="favorite">
              <i
                className={
                  favoriteColor ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
                }
              />
            </div>
          }
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      ) : (
        <button
          onClick={handleFavorite}
          className={`favorite-button ${favoriteColor}`}
        >
          <div className="favorite">
            <i
              className={
                favoriteColor
                  ? "fa-solid fa-bookmark"
                  : "fa-regular fa-bookmark"
              }
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;

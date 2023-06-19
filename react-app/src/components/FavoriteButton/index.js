import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFavoriteThunk, deleteFavoriteThunk } from "../../store/session";

const FavoriteButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let [favoriteColor, setfavoriteColor] = useState("");

  if (!sessionUser) favoriteColor = "";

  if (sessionUser?.user_favorites) {
    for (let favorite of sessionUser?.user_favorites) {
      if (favorite.id === post?.id) favoriteColor = "yellowFavorite";
    }
  }

  // useEffect(() => {

  //   }, [favoriteColor]);

  const handleFavorite = async () => {
    if (!sessionUser) {
      history.push("/login");
    }

    if (favoriteColor === "yellowFavorite") {
      await dispatch(deleteFavoriteThunk(post.id, sessionUser.id));
      setfavoriteColor("");
    } else if (favoriteColor === "") {
      await dispatch(addFavoriteThunk(post?.id, sessionUser?.id));
      setfavoriteColor("yellowFavorite");
    }
  };

  return (
    <button onClick={handleFavorite} className={`favorite-button ${favoriteColor}`}>
      <div className="favorite">
        <i
          className={
            favoriteColor ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
          }
        />
      </div>
    </button>
  );
};

export default FavoriteButton;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLikeThunk, deleteLikeThunk } from "../../store/session";

const LikeButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let [heartColor, setHeartColor] = useState("");

  if (!sessionUser) heartColor = "";

  if (sessionUser?.user_likes) {
    for (let likes of sessionUser?.user_likes) {
      if (likes.id === post?.id) heartColor = "redheart";
    }
  }

  // useEffect(() => {

  //   }, [heartColor]);

  const handleFavorite = async () => {
    if (!sessionUser) {
      history.push("/login");
    }

    if (heartColor === "redheart") {
      await dispatch(deleteLikeThunk(post?.id, sessionUser?.id));
      setHeartColor("");
    } else if (heartColor === "") {
      await dispatch(addLikeThunk(post?.id, sessionUser?.id));
      setHeartColor("redheart");
    }
  };

  return (
    <button onClick={handleFavorite} className={`like-button ${heartColor}`}>
      <div className="heart">
        <i
          className={heartColor ? "fa-solid fa-heart" : "fa-regular fa-heart"}
        />
      </div>
    </button>
  );
};

export default LikeButton;

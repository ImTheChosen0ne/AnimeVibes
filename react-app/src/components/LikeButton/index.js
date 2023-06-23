import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addLikeThunk, deleteLikeThunk } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const LikeButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const ulRef = useRef();

  let [heartColor, setHeartColor] = useState("");

  if (!sessionUser) heartColor = "";

  if (sessionUser?.user_likes) {
    for (let likes of sessionUser?.user_likes) {
      if (likes.id === post?.id) heartColor = "redheart";
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
    if (heartColor === "redheart") {
      await dispatch(deleteLikeThunk(post?.id, sessionUser?.id));
      setHeartColor("");
    } else if (heartColor === "") {
      await dispatch(addLikeThunk(post?.id, sessionUser?.id));
      setHeartColor("redheart");
    }
  };

  return (
    <div className={`like-button ${heartColor}`}>
      {!sessionUser ? (
        <OpenModalButton
          buttonText={
            <div className="heart">
              <i
                className={
                  heartColor ? "fa-solid fa-heart" : "fa-regular fa-heart"
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
          className={`like-button ${heartColor}`}
        >
          <div className="heart">
            <i
              className={
                heartColor ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default LikeButton;

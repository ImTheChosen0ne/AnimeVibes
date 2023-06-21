import React, { useState, ulRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFollowerThunk, removeFollowerThunk } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const FollowButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.session.user?.followers);
  const isFollowing = sessionUser?.followers.find(
    (follower) => follower.id === post?.user.id
  );

  const handleFollow = () => {

    if (isFollowing) {
      dispatch(removeFollowerThunk(sessionUser.id, post.user.id));
    } else {
      dispatch(addFollowerThunk(sessionUser.id, post.user.id));
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  return (
    <div className="follow-button">
      {!sessionUser ? (
        <OpenModalButton
          buttonText={
            !sessionUser
              ? "Follow"
              : followers?.find((follower) => follower.id === post.user.id)
              ? "Following"
              : "Follow"
          }
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      ) : (
        <button onClick={handleFollow}>
          {!sessionUser
            ? "Follow"
            : followers?.find((follower) => follower.id === post?.user.id)
            ? "Following"
            : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FollowButton;

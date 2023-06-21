import React, { useState, ulRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFollowerThunk, removeFollowerThunk } from "../../store/session";
import { fetchPosts } from "../../store/post";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const FollowButtonUser = ({ sessionUser, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const followers = useSelector((state) => state.session.user?.followers);
  const isFollowing = sessionUser?.followers.find(
    (follower) => follower.id === user?.id
  );

  const handleFollow = () => {

    if (isFollowing) {
      dispatch(removeFollowerThunk(sessionUser.id, user.id));
    } else {
      dispatch(addFollowerThunk(sessionUser.id, user.id));
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
              : followers?.find((follower) => follower.id === user?.id)
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
            : followers?.find((follower) => follower.id === user?.id)
            ? "Following"
            : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FollowButtonUser;
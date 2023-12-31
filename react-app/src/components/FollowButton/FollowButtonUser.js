import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowerThunk, removeFollowerThunk } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const FollowButtonUser = ({ sessionUser, user }) => {
  const dispatch = useDispatch();
  const ulRef = useRef();
  const followers = useSelector((state) => state.session.user?.followers);
  const isFollowing = sessionUser?.followers.find(
    (follower) => follower.id === user?.id
  );

  const handleFollow = async () => {

    if (isFollowing) {
      await dispatch(removeFollowerThunk(sessionUser.id, user.id));
    } else {
      await dispatch(addFollowerThunk(sessionUser.id, user.id));
    }
  };

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

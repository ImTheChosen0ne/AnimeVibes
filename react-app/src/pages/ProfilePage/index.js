import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePost from "../../components/DeletePost";
import OpenModalButton from "../../components/OpenModalButton";
import UserPosts from "../../components/UserPosts";
import UserFavorties from "../../components/FavortiePosts";
import UserLikes from "../../components/LikesPosts";
import { fetchPosts } from "../../store/post";
import EditProfile from "../../components/EditProfile";
import "./ProfilePage.css";

const ProfilePage = () => {
  const posts = Object.values(useSelector((state) => state.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const [activeTab, setActiveTab] = useState("videos");
  const dispatch = useDispatch();

  const currentUserPosts = posts.filter(
    (post) => post.userId === sessionUser.id
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const numFollowing = () => {
  //   return sessionUser.followers.length
  // }

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="user-data">
          <div className="user-img">
            <img src={sessionUser.profile_pic} alt="profile picture" />
          </div>
          <div className="user-text">
            <h1>{sessionUser.username}</h1>
            <h5>{sessionUser.name}</h5>
            <div className="edit-profile">
              <OpenModalButton
                buttonText={
                  <div className="button-text">
                    <i className="fa-regular fa-pen-to-square"></i> Edit profile
                  </div>
                }
                modalComponent={<EditProfile sessionUser={sessionUser} />}
                className="edit-profile-button"
              />
            </div>
          </div>
        </div>
        {/* <div>{numFollowing()} Following</div> */}
        <div>{sessionUser.bio}</div>
      </div>
      <div className="user-videos">
        <button onClick={() => handleTabClick("videos")}>Videos</button>
        <button onClick={() => handleTabClick("favorites")}>Favorites</button>
        <button onClick={() => handleTabClick("likes")}>Likes</button>
        {activeTab === "videos" && <UserPosts posts={currentUserPosts} />}
        {activeTab === "favorites" && (
          <UserFavorties sessionUser={sessionUser} />
        )}
        {activeTab === "likes" && <UserLikes sessionUser={sessionUser} />}
      </div>
    </div>
  );
};

export default ProfilePage;

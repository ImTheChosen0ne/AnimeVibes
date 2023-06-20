import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../../components/OpenModalButton";
import UserPosts from "../../components/UserPosts";
import { fetchPosts } from "../../store/post";
import EditProfile from "../../components/EditProfile";
import { fetchUsers } from "../../store/user";
import "./ProfilePage.css";

const UserProfilePage = () => {
  const { userId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  const user = useSelector((state) => state.users[userId]);

  const [activeTab, setActiveTab] = useState("videos");
  const dispatch = useDispatch();

  const currentUserPosts = posts.filter(
    (post) => post.userId === user.id
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const numFollowing = () => {
    return user.followers.length
  }

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  currentUserPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="user-data">
          <div className="user-img">
            <img src={user?.profile_pic} alt="profile picture" />
          </div>
          <div className="user-text">
            <h1>{user.username}</h1>
            <h5>{user.name}</h5>
            <div className="edit-profile">
              <OpenModalButton
                buttonText={
                  <div className="button-text">
                    <i className="fa-regular fa-pen-to-square"></i> Edit profile
                  </div>
                }
                modalComponent={<EditProfile sessionUser={user} />}
                className="edit-profile-button"
              />
            </div>
          </div>
        </div>
        <div>{numFollowing()} Following</div>
        <div>{user.bio}</div>
      </div>
      <div className="user-videos">
        <button onClick={() => handleTabClick("videos")}>Videos</button>
        {/* <button onClick={() => handleTabClick("likes")}>Likes</button> */}
        {activeTab === "videos" && <UserPosts posts={currentUserPosts} />}
        {/* {activeTab === "likes" && <UserLikes sessionUser={user} />} */}
      </div>
    </div>
  );
};

export default UserProfilePage;

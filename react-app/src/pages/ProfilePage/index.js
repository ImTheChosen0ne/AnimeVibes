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


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <div className="user-info">
        <h1>{sessionUser.username}</h1>
        <div>{sessionUser.name}</div>
        <img src={sessionUser.profile_pic} alt="profile picture" />
        <div>{sessionUser.bio}</div>
        <div>
          <OpenModalButton
            buttonText="Edit profile"
            modalComponent={<EditProfile sessionUser={sessionUser} />}
          />
        </div>
      </div>
      <div className="user-videos">
        <button onClick={() => handleTabClick("videos")}>Videos</button>
        <button onClick={() => handleTabClick("favorites")}>Favorites</button>
        <button onClick={() => handleTabClick("likes")}>Likes</button>
        {activeTab === "videos" && <UserPosts posts={currentUserPosts} />}
        {activeTab === "favorites" && <UserFavorties sessionUser={sessionUser} />}
        {activeTab === "likes" && <UserLikes sessionUser={sessionUser} />}
      </div>
    </div>
  );
};

export default ProfilePage;

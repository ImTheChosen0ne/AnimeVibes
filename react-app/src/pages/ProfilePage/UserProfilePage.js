import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserPosts from "../../components/UserPosts";
import { fetchPosts } from "../../store/post";
import { fetchUsers } from "../../store/user";
import FollowButtonUser from "../../components/FollowButton/FollowButtonUser";
import "./ProfilePage.css";

const UserProfilePage = () => {
  const { userId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  const user = useSelector((state) => state.users[userId]);
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const [followersCount, setFollowersCount] = useState("");
  const [activeTab, setActiveTab] = useState("videos");
  const dispatch = useDispatch();

  const currentUserPosts = posts.filter((post) => post.userId === user?.id);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const numFollowing = () => {
    return user?.followers.length;
  };

  const calculateFollowersCount = () => {
    let totalFollowersCount = 0;

    Object.values(users).forEach((user) => {
      const followers = user.followers;
      followers.forEach((follower) => {
        if (follower.id === parseInt(userId)) {
          totalFollowersCount += 1;
        }
      });
    });

    setFollowersCount(totalFollowersCount);
  };

  useEffect(() => {
    calculateFollowersCount();
  }, [calculateFollowersCount]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, sessionUser]);

  currentUserPosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="profile-page">
      <div className="user-info-profile">
        <div className="user-data">
          <div className="user-img">
            <img src={user?.profile_pic} alt="profile" />
          </div>
          <div className="user-text">
            <h1>{user?.username}</h1>
            <h5>{user?.name}</h5>
            <div className="profile-follow">
              <FollowButtonUser
                className="profile-follow-button"
                sessionUser={sessionUser}
                user={user}
              />
            </div>
          </div>
        </div>
        <div className="followes-numbers">
          <div className="following">
            {numFollowing()} <p>Following</p>
          </div>
          <div className="follower-num">
            {followersCount} <p>Followers</p>
          </div>
        </div>
        <div className="bio">{user?.bio}</div>
      </div>
      <div className="user-videos">
        <div className="user-profile-buttons">
          <button
            onClick={() => handleTabClick("videos")}
            className={activeTab === "videos" ? "active" : ""}
          >
            Videos
          </button>
          {/* <button
            onClick={() => handleTabClick("likes")}
            className={activeTab === "likes" ? "active" : ""}
          >
            Likes
          </button> */}
        </div>
        <div className="all-user-vids">
          <div>
            {/* <button onClick={() => handleTabClick("likes")}>Likes</button> */}
            {activeTab === "videos" && <UserPosts posts={currentUserPosts} />}
            {/* {activeTab === "likes" && <UserLikes sessionUser={user} />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

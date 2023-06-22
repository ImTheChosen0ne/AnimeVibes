import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../../store/post";
import LikeButton from "../LikeButton";
import FavoriteButton from "../FavoriteButton";
import FollowButtonUser from "../FollowButton";
import FollowButton from "../FollowButton";
import { fetchUsers } from "../../store/user";
import "./SplashPageFollowing.css";

function FollowersPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const users = Object.values(useSelector((state) => state.users));
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="following-link">
      {sessionUser ? (
        <div className="splash-posts all-posts">
          {sessionUser.followers.map((follower) => {
            const followerPosts = posts.filter(
              (post) => post.userId === follower.id
            );
            return followerPosts.map((post) => (
              <div key={post.id}>
                <div className="post">
                  <div className="avatar">
                    <div className="avatar-img">
                      <span className="span">
                        <NavLink
                          to={
                            sessionUser.id === post.userId
                              ? "/users/profile"
                              : `/users/profile/${post.user.id}`
                          }
                        >
                          <img
                            className="splash-profile-pic"
                            src={post.user.profile_pic}
                            alt="user"
                          />
                        </NavLink>
                      </span>
                    </div>
                  </div>
                  <div className="post-data">
                    <div className="information">
                      <div>
                        <NavLink to={`/posts/${post.id}`} className="links">
                          <p className="user-name">{post.user.username}</p>
                        </NavLink>
                        {sessionUser.id !== post.user.id && (
                          <FollowButton post={post} sessionUser={sessionUser} />
                        )}
                        <NavLink to={`/posts/${post.id}`}>
                          <p className="caption">{post.caption}</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="content">
                      <div className="video">
                        <video
                          src={post.video}
                          // autoPlay={isPlaying}
                          playsInline={true}
                          controls
                          onClick={togglePlay}
                        />
                      </div>
                      <div className="post-buttons">
                        <div className="like-button">
                          <LikeButton sessionUser={sessionUser} post={post} />
                        </div>
                        <div className="favorite-button">
                          <FavoriteButton
                            sessionUser={sessionUser}
                            post={post}
                          />
                        </div>
                        <div className="comment-button">
                          <NavLink to={`/posts/${post.id}`}>
                            <button className="comment-button">
                              <i className="fa-sharp fa-solid fa-comment-dots"></i>
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      ) : (
        <div className="logged-out-following">
          {users.map((user) => (
            <div key={user.id} className="user-post">
              <NavLink to={`/users/profile/${user.id}`}>
                <img src={user.profile_pic} alt="user" />
                <p>{user.username}</p>
              </NavLink>
              <FollowButtonUser user={user} sessionUser={sessionUser} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowersPosts;

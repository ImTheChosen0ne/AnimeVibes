import React, { useEffect, useState, useRef } from "react";
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
  // const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const isFirstVideo = useRef(true);

  // const togglePlay = () => {
  //   setIsPlaying(!isPlaying);
  // };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, posts.length);
  }, [posts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isInView = (element) => {
    const rect = element?.getBoundingClientRect();
    return (
      rect?.top >= 0 &&
      rect?.left >= 0 &&
      rect?.bottom <= window.innerHeight &&
      rect?.right <= window.innerWidth
    );
  };

  const handleScroll = () => {
    videoRefs.current.forEach((video, index) => {
      if ((isFirstVideo.current && index === 0) || isInView(video)) {
        if (video?.paused) {
          video?.play();
        }
      } else {
        if (!video?.paused) {
          video?.pause();
        }
      }
    });
    isFirstVideo.current = false;
  };

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="following-link">
      {sessionUser ? (
        <div className="splash-posts all-posts">
          {sessionUser.followers.map((follower, index) => {
            const followerPosts = posts.filter(
              (post) => post.userId === follower.id
            );
            return followerPosts.map((post) => (
              <div key={post.id}>
                <div className="post">
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
                          ref={(ref) => (videoRefs.current[index] = ref)}
                          src={post.video}
                          autoPlay={index === 0}
                          playsInline={true}
                          controls
                          muted
                          loop
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../../store/post";
import LikeButton from "../LikeButton";
import FavoriteButton from "../FavoriteButton";
import FollowButton from "../FollowButton";
import "./AllPosts.css";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const [isPlaying, setIsPlaying] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="all-posts">
      <div>
        {posts.map((post) => (
          <div key={post?.id}>
            <div className="post">
              <div className="avatar">
                <div className="avatar-img">
                  <span className="span">
                    <img
                      className="splash-profile-pic"
                      src={post.user.profile_pic}
                    />
                  </span>
                </div>
              </div>
              <div className="post-data">
                <div className="information">
                  <div>
                    <NavLink to={`/posts/${post.id}`} className="links">
                      <p className="user-name">{post.user.username}</p>
                    </NavLink>
                    {!sessionUser ? (
                      <FollowButton post={post} sessionUser={sessionUser} />
                    ) : (
                      sessionUser.id !== post.user?.id && (
                        <FollowButton post={post} sessionUser={sessionUser} />
                      )
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
                      <FavoriteButton sessionUser={sessionUser} post={post} />
                    </div>
                    <div className="comment-button">
                      {/* <NavLink to={`/posts/${post.id}`}> */}
                      <button className="comment-button">
                        <i className="fa-sharp fa-solid fa-comment-dots"></i>
                      </button>
                      {/* </NavLink> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;

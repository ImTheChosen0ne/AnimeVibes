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
          <div key={post?.id} className="post">
         {!sessionUser ? (
            <FollowButton post={post} sessionUser={sessionUser} />
          ) : sessionUser.id !== post.user?.id && (
            <FollowButton post={post} sessionUser={sessionUser} />
          )}
            <NavLink to={`/posts/${post.id}`} className="post-data">
              <div>
                <p>{post.user.username}</p>
                <p className="caption">{post.caption}</p>
              </div>
              <video
                src={post.video}
                // autoPlay={isPlaying}
                playsInline={true}
                controls
                onClick={togglePlay}
              />
            </NavLink>
            <div>
              <div>
                <LikeButton sessionUser={sessionUser} post={post} />
              </div>
              <div>
                <FavoriteButton sessionUser={sessionUser} post={post} />
              </div>
              <div>
                <NavLink to={`/posts/${post.id}`}>
                  <button>
                    <i className="fa-sharp fa-solid fa-comment-dots"></i>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;

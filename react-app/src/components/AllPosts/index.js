import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../../store/post";
import "./AllPosts.css";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const [isPlaying, setIsPlaying] = useState(true);

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
          <div key={post.id} className="post">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;

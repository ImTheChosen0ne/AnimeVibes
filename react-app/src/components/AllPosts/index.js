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
    <div>
        <div>
            {posts.map((post) => (
              <div key={post.id}>
                  <NavLink to={`/posts/${post.id}`}>
                  <div>
                    <div>{post.caption}</div>
                    <video src={post.video} width="640" height="500" playsInline={true} controls onClick={togglePlay}/>
                  </div>
                  </NavLink>
              </div>
            ))}
          </div>
    </div>
  );
}

export default AllPosts;

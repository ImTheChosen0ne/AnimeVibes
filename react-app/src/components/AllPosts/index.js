import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../../store/post";
import "./AllPosts.css";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
        <div>
            {posts.map((post) => (
              <div key={post.id}>
                  {/* <NavLink to={`/posts/${post.id}`}> */}
                  <div>
                    <div>{post.caption}</div>
                    <iframe src={post.video} width="640" height="500" frameborder="0" allow="autoplay; fullscreen" allowfullscreen />
                  {/* </NavLink> */}
                  </div>
              </div>
            ))}
          </div>
    </div>
  );
}

export default AllPosts;

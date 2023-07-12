import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post";
import { fetchUsers } from "../../store/user";
import "./Search.css";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const users = Object.values(useSelector((state) => state.users));
  const posts = Object.values(useSelector((state) => state.posts));
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchPosts(query));
    dispatch(fetchUsers(query));
  }, [dispatch, query]);

  const filteredPosts = posts.filter(
    (post) =>
      post.caption?.toLowerCase().includes(query?.toLowerCase()) &&
      post.userId !== sessionUser?.id
  );

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(query?.toLowerCase()) &&
      user.id !== sessionUser?.id
  );

  return (
    <div className="search">
      <h2>Search Results for: {query}</h2>
      {filteredUsers.length > 0 ? (
        <div className="search-users">
          <h3>Accounts:</h3>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <NavLink
                  to={`/users/profile/${user.id}`}
                  className="users-from-search"
                >
                  <img src={user.profile_pic} alt="user"></img>
                  <div className="search-user-info">
                    <p>{user.username}</p>
                    <p className="search-follower">
                      {user.followers.length} Followers
                    </p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="search-none">
          <h3>Accounts:</h3>
          <p>No accounts found.</p>
        </div>
      )}
      {filteredPosts.length > 0 ? (
        <div className="search-posts">
          <h3>Posts:</h3>
          <ul className="posts-from-search">
            {filteredPosts.map((post) => (
              <li key={post.id} className="search-post">
                <NavLink to={`/posts/${post.id}`}>
                  <div className="video-search">
                    <video
                      src={post?.video}
                      // autoPlay={isPlaying}
                      playsInline={true}
                      // controls
                      // onClick={togglePlay}
                    />
                    <div className="search-post-info">
                      <p className="search-caption">{post.caption}</p>
                      <div className="search-post-user">
                        <img src={post.user.profile_pic} alt="user" />
                        <p>{post.user.username}</p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="search-none">
          <h3>Posts:</h3>
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}

export default Search;

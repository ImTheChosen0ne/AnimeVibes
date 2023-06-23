import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import DeletePost from "../../components/DeletePost";
import OpenModalButton from "../../components/OpenModalButton";
import "./UserPosts.css";
const UserPosts = ({ posts }) => {
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
      <div className="all-user-videos">
        {posts.map((post) => (
          <div key={post.id} className="user-video">
            <NavLink to={`/posts/${post.id}`} className="links">
              <div className="profile-video">
                <video
                  src={post?.video}
                  // autoPlay={isPlaying}
                  playsInline={true}
                  controls
                  onClick={togglePlay}
                />
              </div>
            </NavLink>
            {/* <div className="detail-post"> */}
              <div className="name-ellipse-post">
                {sessionUser && sessionUser.id === post.user.id ? (
                  <div className="ellipse-pulldown-post">
                    <div className="main-button-post">⋯</div>
                    <div className="dropdown-content-post">
                      <div className="edit-button-post">
                        <button
                          onClick={() => history.push(`/posts/${post.id}/edit`)}
                          className="edit-post-button"
                        >
                          Update Post
                        </button>
                      </div>
                      <div>
                        <OpenModalButton
                          buttonText="Delete Post"
                          modalComponent={<DeletePost postId={post.id} />}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          // </div>
        ))}
      </div>
  );
};
export default UserPosts;

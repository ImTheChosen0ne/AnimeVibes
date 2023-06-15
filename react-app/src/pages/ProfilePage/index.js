import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePost from "../../components/DeletePost";
import OpenModalButton from "../../components/OpenModalButton";
import "./ProfilePage.css";
const ProfilePage = () => {
  const posts = Object.values(useSelector((state) => state.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentUserPosts = posts.filter(
    (post) => post.userId === sessionUser.id
  );

  return (
    <div>
      <div className="user-info">
        <h1>{sessionUser.username}</h1>
      </div>
      <div className="user-videos">
        {currentUserPosts.map((post) => (
          <div key={post.id}>
            <div className="video">
              <video
                src={post?.video}
                // autoPlay={isPlaying}
                playsInline={true}
                controls
                onClick={togglePlay}
              />
            </div>
            <div className="buttons">
              <div>
                <button
                  onClick={() => history.push(`/posts/${post.id}/edit`)}
                  className="edit-post-button"
                >
                  Update Post
                </button>
              </div>
              <div>
                <OpenModalButton
                  buttonText="Delete Product"
                  modalComponent={<DeletePost postId={post.id} />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

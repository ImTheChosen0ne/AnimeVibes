import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePost from "../../components/DeletePost";
import OpenModalButton from "../../components/OpenModalButton";

const UserPosts = ({ posts }) => {;
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div className="all-user-videos">
        {posts.map((post) => (
          <div key={post.id}>
                <div className="profile-video">
                  <video
                    src={post?.video}
                    // autoPlay={isPlaying}
                    playsInline={true}
                    controls
                    onClick={togglePlay}
                  />
                </div>
            {sessionUser && sessionUser.id === post.user.id ? (
              <>
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
                      buttonText="Delete Post"
                      modalComponent={<DeletePost postId={post.id} />}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
            }
export default UserPosts;

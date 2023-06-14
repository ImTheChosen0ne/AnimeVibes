import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePost from "../../components/DeletePost";
import OpenModalButton from "../../components/OpenModalButton";

const ProfilePage = () => {
  const posts = Object.values(useSelector((state) => state.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

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
            <div>
              {post.caption}
              <video src={post.video} width="640" height="500" />
            </div>
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
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

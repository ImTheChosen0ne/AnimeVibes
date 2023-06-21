import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const UserLikes = ({ sessionUser }) => {;
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div className="all-user-videos">
        {sessionUser?.user_likes?.map((post) => (
          <div key={post.id}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLikes;
 
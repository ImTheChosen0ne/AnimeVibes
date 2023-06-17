import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePost from "../../components/DeletePost";
import OpenModalButton from "../../components/OpenModalButton";

const UserFavorties = ({ sessionUser }) => {;
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div className="user-videos">
        {sessionUser?.user_favorites?.map((post) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFavorties;

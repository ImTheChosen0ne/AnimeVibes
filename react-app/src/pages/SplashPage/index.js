import React from "react";
import AllPosts from "../../components/AllPosts";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="splash">
      <div className="splash-posts">
        <AllPosts />
      </div>
    </div>
  );
};

export default SplashPage;

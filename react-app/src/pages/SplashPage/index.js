import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AllPosts from "../../components/AllPosts";
import SplashSideBar from "../../components/SplashSideBar";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="splash">
      <div className="splash-side-bar">
        <SplashSideBar />
      </div>
      <div className="splash-posts">
        <AllPosts />
      </div>
    </div>
  );
};

export default SplashPage;

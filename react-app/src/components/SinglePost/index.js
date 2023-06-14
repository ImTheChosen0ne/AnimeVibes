import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/post";
import { useHistory, useParams } from "react-router-dom";
import "./SinglePost.css";

const SinglePost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <div>{post?.caption}</div>
      <video src={post?.video} autoPlay={isPlaying} playsInline={true} controls onClick={togglePlay}/>
    </div>
  );
};

export default SinglePost;

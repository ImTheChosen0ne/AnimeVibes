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
  const [comment, setComment] = useState("");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const commentsLength = () => {
    if (post?.comments.length) {
      if (post?.comments.length === 1) {
        return `${post.comments.length} comment`;
      } else if (post?.comments.length > 1) {
        return `${post.comments.length} comments`;
      }
    }
    return "New";
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="single-post">
      <video
        src={post?.video}
        autoPlay={isPlaying}
        playsInline={true}
        controls
        onClick={togglePlay}
      />
      <div>
        <div>{post?.caption}</div>
        <div>
          {post?.user.username}
          {post?.createdAt}
        </div>
        <div>
          {commentsLength()}
          <label>
            <input
              placeholder="Add Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <div>
          {post?.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

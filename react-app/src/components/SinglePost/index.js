import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/post";
// import { fetchComments } from "../../store/comment";
import OpenModalButton from "../../components/OpenModalButton";
import DeleteComment from "../DeleteComment";
import CreateComment from "../CreateComment";
import EditComment from "../EditComment";
import EditReplyComment from "../EditComment/editReplyComment";
import DeleteReplyComment from "../DeleteComment/deleteReplyComment";
import CreateReplyComment from "../CreateComment/createReplyComment";
import "./SinglePost.css";
import { createPortal } from "react-dom";

const SinglePost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);
  // const comments = Object.values(useSelector((state) => state.comments));
  // const sessionUser = useSelector((state) => state.session.user);

  // const postComments = comments.filter((comment) => String(comment.postId) == postId);

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
    // dispatch(fetchComments());
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
          <CreateComment postId={postId} />
        </div>
        <div>
          {post?.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div>
                <p>{comment?.comment}</p>
              </div>
              <div className="buttons">
                <div>
                  <OpenModalButton
                    buttonText="Edit comment"
                    modalComponent={
                      <EditComment postId={postId} comment={comment} />
                    }
                  />
                </div>
                <div>
                  <OpenModalButton
                    buttonText="Delete comment"
                    modalComponent={
                      <DeleteComment postId={postId} commentId={comment?.id} />
                    }
                  />
                </div>
              </div>
              <div>
                <CreateReplyComment commentId={comment?.id} postId={comment?.postId}/>
              </div>
              <div>
                {comment?.commentReply.map((reply) => (
                  <div key={reply?.id} className="comment-reply">
                    <div>
                      <p>{reply?.comment}</p>
                    </div>
                    <div className="buttons">
                      <div>
                        <OpenModalButton
                          buttonText="Edit comment"
                          modalComponent={
                            <EditReplyComment
                              commentId={reply?.commentId}
                              comment={reply}
                            />
                          }
                        />
                      </div>
                      <div>
                        <OpenModalButton
                          buttonText="Delete comment"
                          modalComponent={
                            <DeleteReplyComment
                              commentId={reply?.commentId}
                              replycommentId={reply?.id}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

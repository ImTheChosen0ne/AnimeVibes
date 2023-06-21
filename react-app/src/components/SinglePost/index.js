import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/post";
import OpenModalButton from "../../components/OpenModalButton";
import DeleteComment from "../DeleteComment";
import CreateComment from "../CreateComment";
import EditComment from "../EditComment";
import LikeButton from "../LikeButton";
import FavoriteButton from "../FavoriteButton";
import "./SinglePost.css";

const SinglePost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);
  // const comments = Object.values(useSelector((state) => state.comments));
  const sessionUser = useSelector((state) => state.session.user);

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
  }, [dispatch]);

  return (
    <div className="single-post">
      <div className="detail-post">
        <video
          src={post?.video}
          autoPlay={isPlaying}
          playsInline={true}
          controls
          onClick={togglePlay}
        />
        <div className="detail-caption">{post?.caption}</div>
        <div className="user-info">
          <div className="detail-pro-img">
            <img src={post?.user.profile_pic} className="detail-img" />
            <div className="post-info">
              <div>{post?.user.username}</div>
              <div>{post?.createdAt}</div>
            </div>
            <div className="fav-like-container">
              <div className="like-button">
                <LikeButton sessionUser={sessionUser} post={post} />
              </div>
              <div className="favorite-button">
                <FavoriteButton sessionUser={sessionUser} post={post} />
              </div>
            </div>
          </div>
        </div>
        <div className="all-comments">
          <div>
            <div className="num-comments">{commentsLength()}</div>
          </div>
          <div className="comment-input">
            <div className="comment-pro-img">
              <div>
                <img
                  src={
                    sessionUser && sessionUser.profile_pic
                      ? sessionUser?.profile_pic
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  className="comment-img"
                />
              </div>
              <div className="input-comment">
                <CreateComment postId={postId} />
              </div>
            </div>
          </div>
          {post?.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="user-comment">
                <div className="comment-pro-img">
                  <img src={comment.user.profile_pic} className="comment-img" />
                </div>
                <div className="detail-comment">
                  <div className="user-name">{comment.user.username}</div>
                  <p>{comment?.comment}</p>
                </div>
              </div>
              {sessionUser && sessionUser.id === comment.user.id && (
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
                        <DeleteComment
                          postId={postId}
                          commentId={comment?.id}
                        />
                      }
                    />
                  </div>
                </div>
              )}
              {/* <div>
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
                          postId={postId}
                          />
                        }
                        />
                        </div>
                        </div>
                        </div>
                        ))}
                      </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

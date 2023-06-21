import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCommentThunk } from "../../store/post";
// import { createCommentThunk } from "../../store/comment";
import "./CreateComment.css";
import { useModal } from "../../context/Modal";

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(errors);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Createdcomment = {
      postId: postId,
      userId: sessionUser.id,
      comment,
    };

    const errors = {};
    if (comment === "") {
      errors.comment = "Comment is required";
    }
    if (comment.length > 100) {
      errors.comment = "Comment can not have more than 100 characters";
    }
    setErrors(errors);

    setComment("");
    await dispatch(createCommentThunk(Createdcomment, postId));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          className="input"
          placeholder={sessionUser ? "Add Comment..." : "Log in to comment"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!sessionUser}
        />
        <button
          className="post-comment"
          type="submit"
          //   disabled={!!Object.values(errors).length}
          disabled={!sessionUser}
        >
          Post
        </button>
      </form>
        <h5 className="formErrors">{errors.comment}</h5>
    </div>
  );
};

export default CreateComment;

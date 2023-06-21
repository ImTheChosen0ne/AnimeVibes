import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReplyCommentThunk } from "../../store/post";
// import { createReplyCommentThunk } from "../../store/comment";
import { useModal } from "../../context/Modal";
import { fetchPosts } from "../../store/post";

const CreateReplyComment = ({postId, commentId }) => {
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
    const createdRelyComment = {
      commentId: commentId,
      userId: sessionUser.id,
      comment,
    };

    const errors = {};
    if (comment === "") {
      errors.comment = "Comment is required";
    }
    setComment("");
    await dispatch(createReplyCommentThunk(postId, commentId, createdRelyComment));
    // await dispatch(fetchPosts());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h4 className="formErrors">{errors.comment}</h4>
          <input
              placeholder="Add Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <button
          className="createbutton-post"
          type="submit"
        //   disabled={!!Object.values(errors).length}
        >
          Add a comment...
        </button>
      </form>
    </div>
  );
};

export default CreateReplyComment;

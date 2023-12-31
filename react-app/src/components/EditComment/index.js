import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk } from "../../store/post";
// import { editCommentThunk } from "../../store/comment";
import { useModal } from "../../context/Modal";

const EditComment = ({ postId, comment }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [comments, setComment] = useState(comment?.comment);
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editComment = {
      ...comment,
      comment: comments,
    };

    const errors = {};
    if (comments === "") {
      errors.comment = "Comment is required";
    }
    if (comments.length > 100) {
      errors.comment = "Comment can not have more than 100 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      await dispatch(editCommentThunk(editComment, postId));
      closeModal();
    }
  };

  return (
    <div className="edit-modal">
      <h1>Edit your Comment</h1>
      <form onSubmit={handleSubmit}>
        <div className="edit-comment-input">
          <label>
            <h4 className="formErrors">{errors.comment}</h4>
            <textarea
              placeholder="Enter your comment here"
              value={comments}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <button
            className="createbutton-post"
            type="submit"
            // disabled={!!Object.values(errors).length}
          >
            Edit your comment
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditComment;

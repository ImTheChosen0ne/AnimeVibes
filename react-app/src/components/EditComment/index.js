import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCommentThunk } from "../../store/post";
// import { editCommentThunk } from "../../store/comment";
import { useHistory } from "react-router-dom";
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
      errors.comments = "Comment is required";
    }
    setErrors(errors);

    await dispatch(editCommentThunk(editComment, postId));

    closeModal();
  };

  return (
    <div className="log-in-modal">
      <h1>Edit your Comment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <h4 className="formErrors">{errors?.comments}</h4>
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

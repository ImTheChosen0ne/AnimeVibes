import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCommentThunk } from "../../store/post";
// import { createCommentThunk } from "../../store/comment";

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
      errors.comment = "Review is required";
    }
    setComment("");
    await dispatch(createCommentThunk(Createdcomment, postId));
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
          className="createbutton-product"
          type="submit"
        //   disabled={!!Object.values(errors).length}
        >
          Add a comment...
        </button>
      </form>
    </div>
  );
};

export default CreateComment;

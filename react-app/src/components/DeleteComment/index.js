import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/post"
// import { deleteCommentThunk } from "../../store/comment"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
// import './DeleteReview.css'

const DeleteComment = ({postId, commentId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} =  useModal();

    const handleSubmityes = async (e) => {
      e.preventDefault();
      await dispatch(deleteCommentThunk(postId, commentId))
      await closeModal()
    }

    const handleSubmitno = async (e) => {
      e.preventDefault()
      closeModal()
    }

  return(
    <div className="log-in-modal delete-review-modal">
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this review?</h4>
      <form>
        <div className="delete-buttons">
          <button  onClick={handleSubmityes}>Yes </button>
          <button  onClick={handleSubmitno}> No </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteComment

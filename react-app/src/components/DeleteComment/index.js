import React from "react";
import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/post"
import { useModal } from "../../context/Modal";


const DeleteComment = ({postId, commentId}) => {
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
    <div className="log-in-modal delete-comment-modal">
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this comment?</h4>
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

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePostThunk } from "../../store/post"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";


const DeletePost = ({postId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } =  useModal();
    const deletePost = useSelector(state => state.posts[postId])

    const handleSubmityes = async (e) => {
        e.preventDefault();
        const deletedPost = await dispatch(deletePostThunk(deletePost.id))
        closeModal()
        if(deletedPost){
            history.push('/profile')
          }
    };

    const handleSubmitno = async (e) => {
      e.preventDefault()
      closeModal()
    }

    return(

      <div className="log-in-modal delete-product-modal">
        <h1>Confirm Delete</h1>
        <h4>Are you sure you want to remove this product from the listings?</h4>
        <form>
          <div className="delete-buttons">
            <button  onClick={handleSubmityes}>Yes </button>
            <button  onClick={handleSubmitno}> No </button>
          </div>
        </form>
      </div>
    )
}

export default DeletePost

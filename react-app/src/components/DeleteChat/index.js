import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteChatThunk } from "../../store/session";

const DeleteChat = ({userId, chatId, setActiveChat}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmityes = async (e) => {
    e.preventDefault();
    await dispatch(deleteChatThunk(userId, chatId));
    setActiveChat(null)
    closeModal();
  };

  const handleSubmitno = async (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this chat?</h4>
      <form>
        <div className="delete-buttons">
          <button  onClick={handleSubmityes} className="yes">Yes </button>
          <button  onClick={handleSubmitno}> No </button>
        </div>
      </form>
    </div>
  );
};
export default DeleteChat;

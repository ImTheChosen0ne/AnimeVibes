import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChatThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { fetchUsers } from "../../store/user";
const NewChat = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChat = {
      userIds: [sessionUser.id, selectedUser],
    };

    await dispatch(createChatThunk(newChat, sessionUser.id)).then(() => dispatch(fetchUsers()));
    closeModal();
  };

  return (
    <div className="edit-modal">
      <h1>Find a Friend</h1>
      <div className="edit-comment-input">
        <label>
          {/* <h4 className="formErrors">{errors.comment}</h4> */}
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a friend</option>
            {sessionUser.followers.map((follower) => (
              <option key={follower.id} value={follower.id}>
                {follower?.username}
              </option>
            ))}
          </select>
        </label>
        <button
          className="createbutton-post"
          onClick={handleSubmit}
          disabled={!selectedUser}
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};
export default NewChat;

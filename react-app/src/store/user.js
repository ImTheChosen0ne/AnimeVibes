const GET_USER = "users/GET_USER";
const DELETE_MESSAGE = "users/DELETE_MESSAGE"
// const CREATE_CHAT = "users/CREATE_CHAT"
// const DELETE_CHAT = "users/DELETE_CHAT"

const getUsers = (users) => ({
  type: GET_USER,
  users,
});

// const createChat = (newChat, userId) => ({
//   type: CREATE_CHAT,
//   newChat,
//   userId
// });

// const deleteChat = (chatId, userId) => ({
//   type: DELETE_CHAT,
//   chatId,
//   userId
// });

const deleteMessages = (messageId, userId) => ({
  type: DELETE_MESSAGE,
  messageId,
  userId
});


export const fetchUsers = () => async (dispatch) => {
  const res = await fetch("/api/users");

  if (res.ok) {
    const { users } = await res.json();
    dispatch(getUsers(users));
  }
};

// export const createChatThunk = (chat, userId) => async (dispatch) => {
//   const response = await fetch(`/api/users/${userId}/chats`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(chat),
//   });

//   if (response.ok) {
//     const newChat = await response.json();
//     await dispatch(createChat(newChat, userId));
//     return newChat;
//   }
// };

// export const deleteChatThunk = (userId, chatId) => async (dispatch) => {
//   const response = await fetch(`/api/users/${userId}/chats/${chatId}`, {
//     method: "DELETE",
//   });
//   if (response.ok) {
//     dispatch(deleteChat(chatId));
//     return;
//   }
// };

export const deleteMessageThunk = (userId, messageId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/messages/${messageId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteMessages(messageId, userId));
  }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case GET_USER:
        action.users.forEach((user) => {
          newState[user.id] = user;
        });
        return newState;
      // case CREATE_CHAT:
      //   newState = { ...state };
      //   const { newChat } = action;
      //   const sessionUser = newState[action.userId];
      //   if (sessionUser) {
      //     sessionUser.chats.push(newChat);
      //   }
      //   return newState;
      // case DELETE_CHAT:
      //   newState = { ...state };
      //   const userChat = newState[action.userId];
      //   if (userChat) {
      //     userChat.chats = userChat.chats.filter(
      //       (chat) => chat.id !== action.chatId
      //     );
      //   }
      //   return newState;
      case DELETE_MESSAGE:
        newState = { ...state };
        const { messageId, userId } = action;
        const user = newState[userId];
        if (user) {
          user.messages = user.messages.filter(
            (message) => message.id !== messageId
          );
        }
        return newState;
      default:
        return state;
    }
  };

export default usersReducer;

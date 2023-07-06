import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { fetchUsers } from "../../store/user";
import { deleteMessageThunk } from "../../store/user";
import OpenModalButton from "../../components/OpenModalButton";
import NewChat from "../CreateChatModal";
import DeleteChat from "../DeleteChat";
import "./Message.css";

let socket;

function Message() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const users = Object.values(useSelector((state) => state.users));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    socket.on("delete_message", (deletedMessage) => {
      setMessages((messages) =>
        messages.filter((message) => message.id !== deletedMessage.id)
      );
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      userId: sessionUser.id,
      message: chatInput,
      chatId: activeChatId,
    });
    setChatInput("");
  };

  const deleteMessages = (messageId, userId) => {
    dispatch(deleteMessageThunk(userId, messageId));
  };

  const deleteMessage = (messageId) => {
    socket.emit("delete_message", { id: messageId });
  };

  const getChatUsername = (chatId) => {
    const chat = sessionUser.chats.find((chat) => chat.id === chatId);
    if (chat) {
      const otherUser = users.find((user) =>
        user.chats.some((c) => c.id === chat.id && user.id !== sessionUser.id)
      );
      return otherUser;
    }
  };

  return (
    sessionUser && (
      <div className="user-messages">
        <div className="chats">
          <h1>Messages</h1>
          <OpenModalButton buttonText="New Chat" modalComponent={<NewChat />} />
          {sessionUser.chats.map((chat) => {
            const otherUsers = users.filter((user) =>
              user.chats.find(
                (c) => c.id === chat.id && user.id !== sessionUser.id
              )
            );
            return (
              <div key={chat.id} onClick={() => setActiveChatId(chat.id)}>
                {otherUsers?.map((user) => (
                  <div key={user.id} className="chat">
                    <img src={user.profile_pic} alt="user" />
                    <div>{user.username}</div>
                  </div>
                ))}
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteChat userId={sessionUser.id} chatId={chat.id}/>}
                />
              </div>
            );
          })}
        </div>
        <div className="messages">
          <div>
            {activeChatId && (
              <div className="selected-chat">
                {activeChatId && (
                  <div className="selected-chat">
                    <img
                      src={getChatUsername(activeChatId)?.profile_pic}
                      alt="user"
                    ></img>
                    <h2>{getChatUsername(activeChatId)?.username}</h2>
                    {users
                      .map((user) => user.messages)
                      .flat()
                      .filter((message) => message?.chatId === activeChatId)
                      .sort(
                        (a, b) => new Date(a.createdAt) -  new Date(b.createdAt)
                      )
                      .map((message) => (
                        <div key={message.id}>
                          <div>
                            <img src={message.profile_pic} alt="user"></img>
                            {message.message}
                          </div>
                          {sessionUser.id === message.userId && (
                            <button
                              onClick={() =>
                                deleteMessages(message.id, message.userId)
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {messages
              .filter((message) => message.chatId === activeChatId)
              .map((message, ind) => (
                <div key={ind}>
                  <img src={message.profile_pic} alt="user"></img>
                  {message.message}
                  {sessionUser.id === message.userId && (
                    <button onClick={() => deleteMessage(message.id)}>
                      Delete
                    </button>
                  )}
                </div>
              ))}
          </div>
          <form onSubmit={sendChat}>
            <input value={chatInput} onChange={updateChatInput} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  );
}

export default Message;

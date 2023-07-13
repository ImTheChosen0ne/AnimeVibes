import React, { useState, useEffect, useRef } from "react";
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
  const sentMessagesRef = useRef(null);

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

  useEffect(() => {
    if (sentMessagesRef.current) {
      sentMessagesRef.current.scrollTop = sentMessagesRef.current.scrollHeight;
    }
  }, [activeChatId, messages]);

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
          <div className="chat-header">
            <h1>Messages</h1>
            <OpenModalButton
              buttonText="New Chat"
              modalComponent={<NewChat setActiveChatId={setActiveChatId}/>}
            />
          </div>
          <div className="all-chats">
            {sessionUser.chats.map((chat) => {
              const otherUsers = users.filter((user) =>
                user.chats.find(
                  (c) => c.id === chat.id && user.id !== sessionUser.id
                )
              );
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className="chatter"
                >
                  {otherUsers?.map((user) => (
                    <div key={user.id} className="chat">
                      <img src={user.profile_pic} alt="user" />
                      <div className="chat-info">
                        <p className="message-username">{user.username}</p>
                        <p className="date-chat">{chat.updatedAt}</p>
                      </div>
                    </div>
                  ))}
                  <div className="name-ellipse-chat">
                    <div className="ellipse-pulldown-chat">
                      <div className="main-button-chat">⋯</div>
                      <div className="dropdown-content-chat">
                        <div className="chat-delete-button">
                          <OpenModalButton
                            buttonText="Delete"
                            modalComponent={
                              <DeleteChat
                                userId={sessionUser.id}
                                chatId={chat.id}
                                setActiveChat={setActiveChatId}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="messages">
          {activeChatId && (
            <div className="selected-chat">
              <div className="selected-chat-title">
                <img
                  src={getChatUsername(activeChatId)?.profile_pic}
                  alt="user"
                ></img>
                <h2>{getChatUsername(activeChatId)?.username}</h2>
              </div>
              <div className="sent-messages" ref={sentMessagesRef}>
                {users
                  .map((user) => user.messages)
                  .flat()
                  .filter((message) => message?.chatId === activeChatId)
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        sessionUser.id === message.userId ? "own-message" : ""
                      }`}
                    >
                      <div
                        className={`message-info ${
                          sessionUser.id === message.userId ? "own-message" : ""
                        }`}
                      >
                        <img src={message.profile_pic} alt="user"></img>
                        <p>{message.message}</p>
                      </div>

                      {sessionUser.id === message.userId && (
                        <div className="name-ellipse-message">
                          <div className="ellipse-pulldown-message">
                            <div className="main-button-message">⋯</div>
                            <div className="dropdown-content-message">
                              <div className="message-delete-button">
                                <button
                                  onClick={() =>
                                    deleteMessages(message.id, message.userId)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                {messages
                  .filter((message) => message.chatId === activeChatId)
                  .map((message, ind) => (
                    <div
                      key={ind}
                      className={`message-end ${
                        sessionUser.id === message.userId ? "own-message" : ""
                      }`}
                    >
                      <div className="message-end-info">
                        <img src={message.profile_pic} alt="user"></img>
                        <p>{message.message}</p>
                      </div>
                      {sessionUser.id === message.userId && (
                        <div className="name-ellipse-message">
                          <div className="ellipse-pulldown-message">
                            <div className="main-button-message">⋯</div>
                            <div className="dropdown-content-message">
                              <div className="message-delete-button">
                                <button
                                  onClick={() => deleteMessage(message.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="messages-input-container">
                <form onSubmit={sendChat}>
                  <input
                    value={chatInput}
                    onChange={updateChatInput}
                    placeholder="Send a message..."
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Message;

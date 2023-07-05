import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./Message.css";

let socket;

function Message() {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   if (conversation && Object.keys(conversation).length)
  //       setMessages(conversation.messages.sort((a, b) => {
  //           if (a.id < b.id) {
  //               return -1
  //           }
  //           return 1
  //       }));
  // }, [conversations, conversation]);

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
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
    socket.emit("chat", { user: user.username, msg: chatInput });
    setChatInput("");
  };

  return (
    user && (
      <div>
        <div>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>

        <div>
          {!messages.length && <h4>No messages yet...</h4>}
          <div className="test">
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="group-messages-buttons"
                  onMouseOver={() => {
                    const buttonbox = document.getElementById(message.id);
                    if (buttonbox)
                      buttonbox.className = "message-update-buttons";
                  }}
                  onMouseLeave={() => {
                    const buttonbox = document.getElementById(message.id);
                    if (buttonbox) buttonbox.className = "hidden";
                  }}
                >
                  {/* <MessageDetails key={message.id} message={message} /> */}
                  {message.userId === user.userId && (
                    <div id={message.id} className="hidden">
                      {/* <button
                        className="delete-message-button"
                        onClick={() => deleteChat(message.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button> */}
                      {/* <OpenModalButton
                        buttonText={<i className="fa-solid fa-gear"></i>}
                        // onItemClick={closeMenu}
                        className="update-conversation"
                        modalComponent={
                          <UpdateMessageModal message={message} />
                        }
                      /> */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    )
  );
}

export default Message;

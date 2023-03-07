import React, { forwardRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../utils/time";

const ChatMessagesList = forwardRef(({ messages = [] }, ref) => {
  const user = useSelector((state) => state.auth.user);

  const isAuthor = useCallback(
    (message) => message.author.uid === user.uid,
    [user]
  );

  return (
    <div className="chat-container">
      <ul ref={ref} className="chat-box chatContainerScroll">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`chat-${isAuthor(message) ? "right" : "left"}`}
          >
            <div className="chat-avatar">
              <img src={message?.author?.avatar} alt="Retail Admin" />
              <div className="chat-name">{message?.author?.userName}</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{message.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">
                {formatTimeAgo(message.timestamp)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ChatMessagesList;

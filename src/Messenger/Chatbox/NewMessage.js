import React, { useEffect, useState } from "react";
import { sendChatMessage } from "../../store/actions/messengerActions";
import { useSelector } from "react-redux";

const NewMessage = ({ socketId }) => {
  const [message, setMessage] = useState("");
  const [online, setOnline] = useState(true);

  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPressed = (e) => {
    if (e.code === "Enter" && message) {
      proceedChatMessage();
      setMessage("");
    }
  };

  useEffect(() => {
    if (!onlineUsers.find((user) => user.socketId === socketId)) {
      setOnline(false);
    }
  }, [onlineUsers]);

  const proceedChatMessage = () => {
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage(socketId, message);
    }
  };

  return (
    <div className="chatbox_new_message_container">
      <input
        className={`chatbox_new_message_input ${
          online ? "" : "redPalaceholder"
        }`}
        type="text"
        placeholder={online ? "Type your message..." : "User left the room...!"}
        value={message}
        disabled={!online}
        onChange={handleChange}
        onKeyDown={handleKeyPressed}
      />
    </div>
  );
};

export default NewMessage;

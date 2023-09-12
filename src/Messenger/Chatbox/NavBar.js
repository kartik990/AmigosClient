import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../../assests/close-icon.svg";
import { removeChatbox } from "../messengerSlice";

const ChatboxLabel = ({ username }) => {
  return <p className="chatbox_nav_bar_label">{username}</p>;
};

const CloseButton = ({ socketId }) => {
  const dispatch = useDispatch();

  const handleCloseChatbox = () => {
    dispatch(removeChatbox(socketId));
  };

  return (
    <div className="chatbox_close_icon_container">
      <img
        src={closeIcon}
        alt="close"
        className="chatbox_close_icon_img"
        onClick={handleCloseChatbox}
      />
    </div>
  );
};

const NavBar = ({ username, socketId }) => {
  const [online, setOnline] = useState(true);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  useEffect(() => {
    if (!onlineUsers.find((user) => user.socketId === socketId))
      setOnline(false);
  }, [onlineUsers]);

  return (
    <div
      className={`chatbox_nav_bar_container ${online ? "" : "offlineUserNav"} `}
    >
      <ChatboxLabel username={username} />
      <CloseButton socketId={socketId} />
    </div>
  );
};

export default NavBar;

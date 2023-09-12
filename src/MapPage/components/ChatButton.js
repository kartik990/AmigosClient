import React from "react";
import { useDispatch } from "react-redux";
import { addChatbox } from "../../Messenger/messengerSlice";
import chatIcon from "./../../assests/chat-icon.svg";

const ChatButton = ({ socketId, username }) => {
  const dispatch = useDispatch();

  const handleAddChatbox = () => {
    dispatch(
      addChatbox({
        username,
        socketId,
      })
    );
  };

  return (
    <img
      alt=""
      src={chatIcon}
      className="map_page_card_img"
      onClick={handleAddChatbox}
    ></img>
  );
};

export default ChatButton;

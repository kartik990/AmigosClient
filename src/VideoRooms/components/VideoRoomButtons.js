import React from "react";
import disconnectIcon from "../../assests/call-disconnect-icon.svg";
import micIcon from "../../assests/mic-icon.svg";
import micOffIcon from "../../assests/mic-off-icon.svg";
import cameraIcon from "../../assests/camera-icon.svg";
import cameraOffIcon from "../../assests/camera-off-icon.svg";
import { leaveVideoRoom } from "../../store/actions/videoRoomActions";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsMicOn,
  setIsCameraOn,
} from "../../realtimeCommunication/videoRoomsSlice";

const VideoRoomButtons = ({ inRoom }) => {
  const isMicOn = useSelector((state) => state.videoRooms.isMicOn);
  const isCameraOn = useSelector((state) => state.videoRooms.isCameraOn);
  const localStream = useSelector((state) => state.videoRooms.localStream);

  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    leaveVideoRoom(inRoom);
  };

  const handleMuteUnmuteChange = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
    dispatch(setIsMicOn(!isMicOn));
  };

  const handleCameraOnOffChange = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
    dispatch(setIsCameraOn(!isCameraOn));
  };

  return (
    <div className="m_page_v_rooms_video_buttons_container">
      <button
        onClick={handleMuteUnmuteChange}
        className="m_page_v_rooms_video_button"
      >
        <img
          alt=""
          src={isMicOn ? micIcon : micOffIcon}
          width="25px"
          height="25px"
        />
      </button>
      <button onClick={handleLeaveRoom} className="m_page_v_rooms_video_button">
        <img alt="" src={disconnectIcon} width="25px" height="25px" />
      </button>
      <button
        onClick={handleCameraOnOffChange}
        className="m_page_v_rooms_video_button"
      >
        <img
          alt=""
          src={isCameraOn ? cameraIcon : cameraOffIcon}
          width="25px"
          height="25px"
        />
      </button>
    </div>
  );
};

export default VideoRoomButtons;

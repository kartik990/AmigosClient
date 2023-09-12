import "./loginpage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";
import { getFakeLocation } from "./FAKE_LOCATION";
import { connectWithSocketIOServer } from "../socketConnection/socketConn";
import { proceedWithLogin } from "../store/actions/loginPageActions";
import { connectWithPeerServer } from "../realtimeCommunication/webRTCHandler";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [locationErrorOccured, setLocationError] = useState(false);

  const myLocation = useSelector((state) => state.map.myLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    proceedWithLogin({
      username: userName,
      coords: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
    });
    navigate("/map");
  };

  const isValidUserName = (userName) =>
    userName.length > 0 && userName < 20 && !userName.includes(" ");

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onSucess = (postion) => {
    console.log(postion);
    dispatch(
      setMyLocation({
        lat: postion.coords.latitude,
        lng: postion.coords.longitude,
      })
    );
  };
  const onError = (err) => {
    console.log(err);
    setLocationError(true);
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   onSucess,
    //   onError,
    //   locationOptions
    // );

    onSucess(getFakeLocation());
  }, []);

  useEffect(() => {
    if (myLocation) {
      connectWithSocketIOServer();
      connectWithPeerServer();
    }
  }, [myLocation]);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <div className="logo">Welcome Amigo👋</div>
        <input
          className="l_page_input"
          value={userName}
          placeholder="Enter a nick name..."
          onChange={(e) => setUserName(e.target.value)}
        />
        {locationErrorOccured && (
          <p className="l_alert">Please permit location sharing</p>
        )}
        <button
          disabled={isValidUserName(userName)}
          className="l_page_login_button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

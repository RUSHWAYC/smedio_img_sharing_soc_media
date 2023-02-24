import React from "react";
import jwtDecode from "jwt-decode";
//import GoogleLogin from 'react-google-login';
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  //Get and save data from Google sign in.
  const responseGoogle = (response) => {
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(response.credential))
    );
    const { name, sub, imageUrl } = jwtDecode(response.credential);
    //Export the data to Sanity. Connecting backend with front end.
    const doc = {
      //get the Google sub for matching users in Sanity for useEffect on Home.jsx
      _id: sub,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    //Once logged create the user if they don't exist already.
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        {/* Background video. */}
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        {/* Image logo. */}
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          {/* Google login button. */}
          <div className="shadow-2xl">
            <GoogleLogin
              //onSuccess of GoogleLogin get the data to utils index.
              onSuccess={responseGoogle}
              onError={() => console.log("Error.")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

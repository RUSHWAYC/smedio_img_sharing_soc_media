import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { client } from "../client";
import { userQuery } from "../utils/data";
import logo from "../assets/logo.png";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  //Set the sidebar to false so that it's not seen. State that opens and closes the side bar.
  const [toggleSidebar, setToggleSidebar] = useState(false);

  //Set the starting user as null, so that it can be changed once logged in and use the user data.
  const [user, setUser] = useState(null);

  const scrollRef = useRef(null);

  //ORIGINALLY: Get the user from localStorage in ../components/Login.jsx, if there is none clear local storage in case user token expired.
  //NOW: get the user from localStorage in ../utils/fetchUser.js.
  const userInfo = fetchUser();

  //Get user data and match it with Google sub from Login.jsx
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    //Set the user that is logged in.
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.sub]);

  //At the start set up the scroll at the top.
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    //md:flex-row is for medium devices
    //flex-col is for fullscreen devices
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* This sidebar will be hidden for all devices, except for medium ones which will be md:flex */}
      <div className="hidden md:flex h-screen flex-initial">
        {/* {user && user} -> if the user exists, send the user. Otherwise pass false. */}
        <Sidebar user={user && user} />
      </div>

      {/* Reverse from above. Sidebar is hidden for medium devices and flex for fullscreen ones. */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          {/* react-icons burger menu icon. On click expands the side bar. */}
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          {/* Logo button that returns to the front page on click. */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {/* Logged in user image. Goes to user profile once clicked. */}
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              referrerPolicy="no-referrer"
              alt="user-pic"
              className="w-28"
            />
          </Link>
        </div>

        {/* Check if sidebar is toggled. So if setToggleSidebar state is (true) */}
        {toggleSidebar && (
          //^if it is, anime-slide-in.
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              {/* react-icons X button that sets the sidebar to false and closes it. */}
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {/* Desktop sidebar. */}
            {/* {user && user} -> if the user exists, send the user. Otherwise pass false. */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      {/*  */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          {/* :userId is dynamic. And opens the UserProfile component */}
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          {/* /* means render anything else. WIP for more on that. */}
          {/* {user && user} provide the user only if the user exists. user is a prop for Pins*/}
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

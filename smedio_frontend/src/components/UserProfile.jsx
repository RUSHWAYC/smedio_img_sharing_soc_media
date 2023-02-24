import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  //Will be Created or Saved.
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  //:pinId was set as a dynamic parameter in Pins.jsx
  //So now using useParams() it can be accessed.
  const { userId } = useParams();

  //Fetch user data. Called when [userId] changes.
  useEffect(() => {
    const query = userQuery(userId);

    client
      .fetch(query)
      //Get the user array.
      .then((data) => {
        //Get the first user from the array only.
        setUser(data[0]);
      });
  }, [text, userId]);

  //setPins to show either created or saved depending on the button press
  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPins = userSavedPinsQuery(userId);
      client.fetch(savedPins).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  //Loading if there is no user.
  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {/* If User ID of logged in matches the account user ID logout is available. */}
              {userId === user._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={() => {
                    googleLogout();
                    logout();
                  }}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                //Sets text useState to the contents/text of the <button>.
                setText(e.target.textContent);
                //setActiveBtn was set by useState to 'created' by default.
                //As such, it will be highlighted by activeBtnStyles.
                //Once the second button is created, setActiveBtn becomes 'saved"
                //and it reverses the button colors.
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {/* Show users created or saved pins depending on the button selection. */}
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No pins found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

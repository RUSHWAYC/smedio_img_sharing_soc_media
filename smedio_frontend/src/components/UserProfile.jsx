import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const UserProfile = () => {

  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  //Will be Created or Saved.
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  //:pinId was set as a dynamic parameter in Pins.jsx
  //So now using useParams() it can be accessed.
  const { userId } = useParams()

  //Fetch user data. Called when [userId] changes.
  useEffect(() => {
    const query = userQuery(userId)

    client.fetch(query)
    //Get the user array.
     .then((data) => {
      //Get the first user from the array only.
        setUser(data[0])
     })
  }, [userId])
  
  //Loading if there is no user.
  if(!user) {
    return <Spinner message='Loading profile...'/>
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner-pic'
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user.image}
              alt='user-pic'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
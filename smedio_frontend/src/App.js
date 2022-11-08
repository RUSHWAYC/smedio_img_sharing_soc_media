import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import {gapi} from "gapi-script";
import { fetchUser } from './utils/fetchUser';

const App = () => {

    const navigate = useNavigate()

    useEffect(() => {
      const user = fetchUser()
      if(!user) navigate('/login')
    }, [])
    

    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId: process.env.REACT_APP_Google_API_Token,
          plugin_name: {},
        });
      });

    return (
        <Routes>
            <Route path ='login' element={<Login />} />
            <Route path ='/*' element={<Home />} />
        </Routes>
    )
}

export default App
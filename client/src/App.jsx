import { createContext, useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {  Routes, Route, Link, useNavigate } from "react-router-dom";
import axiosBase from "./api/axiosBase";


export const AppState = createContext();


function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [user,setUser]= useState({});

  const checkUser = async ()=>{

    try {
      const {data} = await axiosBase.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (err) {
      console.log(err.response);
      navigate('/login');
    }
  }

  useEffect( ()=> {
    checkUser();
  }, [])

  return (
    <AppState.Provider value={{user,setUser}}>
 
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
     
    </AppState.Provider>
  );
}

export default App

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import {useState,useEffect } from 'react';
import PrivateRoute from './route/privateRoute';
import api from './utils/api';

function App() {
  const [user,setUser] = useState(null);
  const getUser =async () => {
    try{
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        const response = await api.get("/user/me");
        console.log("response:",response);
        setUser(response.data.user);
      }
    }catch(error){
      // console.log("error:",error);
      setUser(null);
    }
  }

  useEffect(()=>{
    getUser();
    console.log("...........");
  },[]) ;
      
  return (
    <Routes>

      <Route path="/" element={<PrivateRoute user={user}><TodoPage /></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;

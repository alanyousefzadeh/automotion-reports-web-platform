import React from "react";
import "./Navigation.scss";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../Context/AuthContext';
import {AuthContextProvider} from '../Context/AuthContext'

export default function Navigation() {
  const [error, setError] = useState("")
  const {user, logout} = UserAuth()
  const nav = useNavigate();
 
  const handleLogout = async () => {
    
    try {
      sessionStorage.removeItem("token");
      await logout();
      nav('/login');
      console.log('You are logged out')
    } catch (e) {
      setError(e.message)
      console.log(e.message);
    }
  };
  return (
    <nav>
      <ul>
        <li>
          <a href="/welcome">Home</a>
        </li>
        <li>
          <button className="nav__button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

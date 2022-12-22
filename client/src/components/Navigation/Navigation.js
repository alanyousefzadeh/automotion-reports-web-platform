import React, { useEffect } from "react";
import "./Navigation.scss";
import {useState} from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from '../Context/AuthContext';
import {AuthContextProvider} from '../Context/AuthContext'
import { isUserTech } from '../../firebase';


export default function Navigation() {
  const [error, setError] = useState("")
  const [isTech, setIsTech] = useState(true)

  const {user, logout} = UserAuth()
  const nav = useNavigate();
  
  useEffect(()=> {
    isUserTech(user.email, setIsTech)
  },[])
    
 
  const handleLogout = async () => {
    
    try {
      // sessionStorage.removeItem("token");
      // sessionStorage.removeItem("monthliesData")
      sessionStorage.clear()
      await logout();
      nav('/login');
      console.log('You are logged out')
    } catch (e) {
      setError(e.message)
      console.log(e.message);
    }
  };
  const redirect = () => {
    nav('/welcome')
  }

  const adminRoute = () => {
    nav('/admin')
  }
  return (
    <nav>
      <ul className="navigation">
        <div className="navigation__left">
          <li>
            <button className="nav__button" onClick={redirect}>Home</button>
          </li>
          <li>
            <button className="nav__button" onClick={handleLogout}>Logout</button>
          </li>
        </div>
        <div className="navigation__right">
          <li className={isTech ? "hidden" : ""}>
            <button className="nav__button" onClick={adminRoute}>Admin</button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import homeLogo from "../../assets/loginLogo.png";
import "./Navigation.scss";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const nav = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    nav("/login");
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
        {/* <li>
          <a href="contact.asp">Contact</a>
        </li>
        <li>
          <a href="about.asp">About</a>
        </li> */}
      </ul>
    </nav>
  );
}

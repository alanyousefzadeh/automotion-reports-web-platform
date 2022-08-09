import { Link } from "react-router-dom";
import './WelcomePage.scss'
import React, { useState, useEffect } from "react";
import axios from "axios";
import GarageCard from "../../components/GarageCard/GarageCard";
import baxter from "../../assets/baxter.png";
import vanvorst from "../../assets/vanvorst.png";
import waverly from "../../assets/waverly.png";
import atlanticTerrace from "../../assets/atlanticTerrace.png";
import Logout from "../../components/Logout/Logout";
import Navigation from '../../components/Navigation/Navigation'

const data = [
  {
    id: 1,
    title: "Baxter",
    image: baxter,
  },
  {
    id: 2,
    title: "VanVorst",
    image: vanvorst,
  },
  {
    id: 3,
    title: "Waverly",
    image: waverly,
  },
  {
    id: 4,
    title: "Atlantic Terrace",
    image: atlanticTerrace,
  },
];

function WelcomePage() {
  // const [garages, setGarages] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
      return;
    }
    // Get the data from the API
    axios
      .get("http://localhost:8080/currentUser", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setCurrUser(response.data.name);
      })
      .catch((e) => {
        // setFailedAuth(true);
        console.log(e);
      });
  }, []);

  if (failedAuth) {
    return (
      <p>
        You must be logged in to see this page. <Link to="/login">Log in</Link>
      </p>
    );
  }

  return (
    <>
    <Navigation/>
    <div className="cards d-flex justify-content-center">
      {/* <nav>
        <h1>welcome, {currUser}</h1>
        <Logout />
      </nav> */}
      {data.map((garage) => (
        <GarageCard
          key={garage.id}
          id={garage.id}
          title={garage.title}
          image={garage.image}
        />
      ))}
    </div>
    </>
  );
}

export default WelcomePage;

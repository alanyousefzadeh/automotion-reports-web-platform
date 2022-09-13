import './WelcomePage.scss'
import React, { useState} from "react";
import GarageCard from "../../components/GarageCard/GarageCard";
import baxter from "../../assets/baxter.png";
import vanvorst from "../../assets/vanvorst.png";
import waverly from "../../assets/waverly.png";
import atlanticTerrace from "../../assets/atlanticTerrace.png";
import Navigation from '../../components/Navigation/Navigation'

const data = [
  {
    id: 4,
    title: "Atlantic Terrace",
    image: atlanticTerrace,
  },
  {
    id: 1,
    title: "Baxter",
    image: baxter,
  },
  {
    id: 5,
    title: "schemehorn",
    image: "schemehorn"
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
];

function WelcomePage() {
  
  const [currUser, setCurrUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);


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

import './WelcomePage.scss'
import React, { useState, useEffect } from "react";
import GarageCard from "../../components/GarageCard/GarageCard";
import baxter from "../../assets/baxter.png";
import vanvorst from "../../assets/vanvorst.png";
import waverly from "../../assets/waverly.png";
import atlanticTerrace from "../../assets/atlanticTerrace.png";
import street24 from '../../assets/street24.png';
import schemehorn from "../../assets/schemehorn.png"
import Navigation from '../../components/Navigation/Navigation'
import { isUserTech } from '../../firebase';
import { getAuth } from "firebase/auth";
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';

const garages = [
  {
    id: 1,
    title: "Atlantic Terrace",
    image: atlanticTerrace,
  },
  {
    id: 2,
    title: "Baxter",
    image: baxter,
  },
  {
    id: 3,
    title: "Schemehorn",
    image: schemehorn
  },

  {
    id: 4,
    title: "VanVorst",
    image: vanvorst,
  },
  {
    id: 5,
    title: "Waverly",
    image: waverly,
  },
  {
    id: 6,
    title: "24th Street",
    image: street24
  },
];

function WelcomePage() {

  const [failedAuth, setFailedAuth] = useState(false);
  const [isTech, setIsTech] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const auth = getAuth()
  async function checkUser(){
    
    await isUserTech(auth.currentUser.email, setIsTech)
    
    setTimeout(() => 
      setIsLoading(false)
    , "400")
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      
      {isLoading ?
        <LoadingSpinner />
        :
        <>
        <Navigation />
        <div className="cards d-flex justify-content-center">
          {garages.map((garage) => (
            <div key={garage.id} className={(isTech && (garage.title === "Atlantic Terrace" || garage.title ==="Schemehorn")) ? 'hidden' : ""}>
              <GarageCard
                id={garage.id}
                title={garage.title}
                image={garage.image}
              />
            </div>
          ))}
        </div>
        </>
      }
    </>
  );
}

export default WelcomePage;

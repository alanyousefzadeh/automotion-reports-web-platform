import React, { useState} from 'react';
import axios from 'axios';
import GarageCard from '../../components/GarageCard/GarageCard';
import baxter from '../../assets/baxter.png';
import vanvorst from '../../assets/vanvorst.png';
import waverly from '../../assets/waverly.png';
import atlanticTerrace from '../../assets/atlanticTerrace.png';
const data = [
    {
      id: 1,
      title: "Baxter",
      image: baxter
    },
    {
      id: 2,
      title: "VanVorst",
      image: vanvorst
    },
    {
      id: 3,
      title: "Waverly",
      image: waverly
    },
    {
      id: 4,
      title: "Atlantic Terrace",
      image: atlanticTerrace
    },
  ]

function WelcomePage() {
  // const [garages, setGarages] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
      return;
    }
    // Get the data from the API
    axios
      .get("http://localhost:8080/authenticate", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setCurrUser(response.data.name);
      })
      .catch(() => {
        setFailedAuth(true);
      });
  }, []);

  return (
    <div className="cards d-flex justify-content-center">
      {data.map((garage) => (
        <GarageCard
          key={garage.id}
          id={garage.id}
          title={garage.title}
          image={garage.image}
        />
      ))}
    </div>
  );
}

export default WelcomePage;
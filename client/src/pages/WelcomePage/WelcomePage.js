import React, { useState} from 'react';
import axios from 'axios';
import Garage from '../../components/Garage/Garage';

const data = [
    {
      id: 1,
      title: "Garage title",
      image: "https://i.imgur.com/example.jpg"
    },
    {
      id: 2,
      title: "Garage title",
      image: "https://i.imgur.com/example.jpg"
    },
    {
      id: 3,
      title: "Garage title",
      image: "https://i.imgur.com/example.jpg"
    },
    ]

function ReportPage(){
    // const [garages, setGarages] = useState([]);
    return (

        <div className="cards d-flex justify-content-center"> 
            {data.map(garage =>(
                <Garage key={garage.id} title={garage.title} image={garage.image}/>    
            ))}
        </div>
    );

}

export default ReportPage;
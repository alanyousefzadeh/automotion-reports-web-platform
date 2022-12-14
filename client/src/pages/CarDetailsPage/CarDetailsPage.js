import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import './CarDetailsPage.scss'
import Navigation from '../../components/Navigation/Navigation';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
export default function CarDetailsPage() {

    const [carData, setCarData] = useState(null)
    const { carId, garageName } = useParams()

    useEffect(() => {
        axios.
            get(
                //'http://localhost:8080/carDetails',
                'https://automotion-heroku-server.herokuapp.com/carDetails',
                {
                    params: {
                        carId,
                        garageName
                    },
                    headers: {
                      authorization: 'Bearer ' + token
                    }

                }
            )
            .then((res) => {
                setCarData(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div>
            <Navigation/>
            {carData !== null ?
            <Table striped bordered className="monthlies report table-sm">
                <tbody>
                    <tr>
                        <td className='car-Details-Data'>Customer Name</td>
                        <td className='car-Details-Data'>{carData.CustomerName}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Customer Number</td>
                        <td className='car-Details-Data'>{carData.CustomerNumber}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Car Bar Code</td>
                        <td className='car-Details-Data'>{carData.CarBarCode}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Rate</td>
                        <td className='car-Details-Data'>{carData.Rate}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>License Plate</td>
                        <td className='car-Details-Data'>{carData.LicensePlate}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Year, Make, Model</td>
                        <td className='car-Details-Data'>{carData.Year} {carData.Make} {carData.Model}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Color</td>
                        <td className='car-Details-Data'>{carData.Color}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Street Address</td>
                        <td className='car-Details-Data'>{carData.StreetAddress}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>City, State Zip</td>
                        <td className='car-Details-Data'>{carData.City}, {carData.State} {carData.Zip}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Main Phone</td>
                        <td className='car-Details-Data'>{carData.MainPhone}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Alt Phone</td>
                        <td className='car-Details-Data'>{carData.AltPhone}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Num Allowed To Park</td>
                        <td className='car-Details-Data'>{carData.NumAllowedToPark}</td>
                    </tr>
                    <tr>
                        <td className='car-Details-Data'>Num Currently Parked</td>
                        <td className='car-Details-Data'>{carData.NumCurrentlyParked}</td>
                    </tr>

                </tbody>
            </Table>
            :<LoadingSpinner/>
            }
        </div>
    )
}

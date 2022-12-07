import React, { useState, useLocation, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import {UserAuth} from "../Context/AuthContext";
import { isUserTech } from '../../firebase';
import LoadingSpinner from '../LoadingWheel/LoadingWheel';
import { Modal } from 'react-bootstrap';

const ProtectedRoute = ({children})=> {
    const [isTech, setIsTech] = useState(null)
    
    const {user} = UserAuth();
    //const {location} = useLocation()
    console.log(window.location.pathname)
    let path = (window.location.pathname)
    const {garageName} = useParams()

    let techAllowedRoutes = ['/welcome',`/reportSelect/${garageName}`, `/reportSelect/${garageName}/Filter`, `/reportSelect/${garageName}/Monthlies`, `/reportSelect/${garageName}/Wait`]
    //if no user is logged into Firebase, return to login page
    if(!user){
        return <Navigate to='/' />;
    }
  
    //function to check if logged in user is a Tech
    //returns true or flase
    isUserTech(user.email, setIsTech)
 
    return (

        isTech === null?
            <LoadingSpinner/>
        :isTech === true ?
            techAllowedRoutes.includes(path)?
                children
            :<Navigate to='/unauthorized'/>
        :
        children    
    )
}

export default ProtectedRoute;

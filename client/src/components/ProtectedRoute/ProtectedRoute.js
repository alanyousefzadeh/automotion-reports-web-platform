import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import {UserAuth} from "../Context/AuthContext";
import { isUserTech } from '../../firebase';
import LoadingSpinner from '../LoadingWheel/LoadingWheel';

const ProtectedRoute = ({children})=> {
    const [isTech, setIsTech] = useState(null)
    
    const {user} = UserAuth();
    console.log(window.location.pathname)
    let path = (window.location.pathname)
    const {garageName} = useParams()
    
    let techAllowedRoutes = [
        '/welcome',
        `/reportSelect/Baxter`, 
        `/reportSelect/VanVorst`, 
        `/reportSelect/Waverly`, 
        `/reportSelect/24th%20Street`, 
        `/reportSelect/${garageName}/Filter`, 
        `/reportSelect/${garageName}/Monthlies`, 
        `/reportSelect/${garageName}/Wait`,
        `/reportSelect/24th%20Street/Filter`, 
        `/reportSelect/24th%20Street/Monthlies`, 
        `/reportSelect/24th%20Street/Wait`
    ]
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

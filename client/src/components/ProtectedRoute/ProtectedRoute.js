import React from 'react';
import { Navigate } from 'react-router-dom';
import {UserAuth} from "../Context/AuthContext";


const ProtectedRoute = ({children})=> {
    let emails = (children.props.email)
    const {user} = UserAuth();
    console.log("logged in user email: ", user.email)
    if(!user){
        return <Navigate to='/' />;
    }
    else if(emails.indexOf(user.email) > -1) {
        return children
    }
    else{
        alert("unauthorized")
        return <Navigate to='/welcome' />;
    }
}

export default ProtectedRoute;
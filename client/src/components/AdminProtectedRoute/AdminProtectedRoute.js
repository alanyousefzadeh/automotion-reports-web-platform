import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {UserAuth} from "../Context/AuthContext";

const AdminProtectedRoute = ({children})=> {

    let emails = (children.props.email)
    let location = useLocation()
    let path = location.pathname
    console.log(path.substring(0,path.lastIndexOf('/') ))
    let newpath = path.substring(0,path.lastIndexOf('/') )
    const {user} = UserAuth();
    console.log("logged in user email: ", user.email)
    if(!user){
        return <Navigate to='/' />;
    }
    //checks if current users email is in the array of authorized user emails
    else if(emails.indexOf(user.email) > -1) {
        //children is the component
        return children
        
    }
    else{
        alert("unauthorized")
        return <Navigate to={newpath}/>
    }
}

export default AdminProtectedRoute;
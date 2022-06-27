import React, { useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import LoginComponent from '../../components/Login/Login';

function LoginPage(){

    return (
        <LoginComponent/>
    );

}

export default LoginPage;
import React, { useState } from 'react'
import './AdminPage.scss'
import { getAuth, createUserWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import AdminModal from '../../components/AdminModal/AdminModal'
import { writeUserData } from '../../firebase';
import Navigation from '../../components/Navigation/Navigation';
import Button from "react-bootstrap/Button";

export default function AdminPage() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        userID: '',
        type: '',
        password: '',
        confirm: ''
    })
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        window.location.reload()
    }
    const handleShow = () => setShow(true);

    var authApp = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    }, 'authApp');

    var detachedAuth = getAuth(authApp);

    //Create User with Email and Password
    const handleSubmit = async e => {
        e.preventDefault();

        //if all fields are filled, create the user
        if (form.userID !== '' && form.name !== '' && form.email !== '' && form.password !== '' && form.type !== '' && form.confirm !== '') {
            
            //function to add user to authenticated Firebase DB
            await createUserWithEmailAndPassword(detachedAuth, form.email, form.password)

            //function to add user to Firebase real-time database
            writeUserData(form.userID, form.name, form.email, form.type)

            setForm({
                userID: '',
                name: '',
                email: '',
                type: '',
                password: '',
                confirm: ''
            })
            handleShow()
        
        //handle passwords dont match
        } else if (form.password !== form.confirm) {
            alert("passwords must match")
            //window.location.reload()
        }


    }

    const setField = (field, value) => {
        //This will update our state to keep all the current form values, then add the newest form value to the correct key location
        setForm({
            ...form,
            [field]: value
        })
    }

    return (
        <div>
            {!show ?
                <div className='new-user-page'>
                    <Navigation />
                    <form className='new-user-form' onSubmit={handleSubmit}>
                        <h6>AdminPage</h6>
                        <div className='user-input'>
                            <label htmlFor="UserID">UserID:</label>
                            <input className='input' type="text" value={form.userID} onChange={e => setField('userID', e.target.value)} name="userID" />
                        </div>
                        <div className='user-input'>
                            <label htmlFor="fname">Name:</label>
                            <input className='input' type="text" placeholder='First Last' value={form.name} onChange={e => setField('name', e.target.value)} name="fname" />
                        </div>
                        <div className='user-input'>
                            <label htmlFor="email" >Email:</label>
                            <input className='input' type="email" value={form.email} onChange={e => setField('email', e.target.value)} name="email" />
                        </div>
                        <div className='user-input'>
                            <label htmlFor="password">Password:</label>
                            <input className='input' type="password" value={form.password} onChange={e => setField('password', e.target.value)} name="password" />
                        </div>
                        <div className='user-input'>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input className='input' type="password" value={form.confirm} onChange={e => setField('confirm', e.target.value)} name="confirmPassword" />
                        </div>
                        <p className='radio-buttons-title'>User Type:</p>
                        <div className='radio-buttons' onChange={e => setField('type', e.target.value)}>

                            <div className='radio-selectios'>
                                <div className='type-radio'>
                                    <input className='type-input' type="radio" value="Admin" name="type" />
                                    <p className='type-radio_text'>Admin</p>
                                </div>
                                <div className='type-radio'>
                                    <input className='type-input' type="radio" value="Tech" name="type" />
                                    <p className='type-radio_text'>Tech</p>
                                </div>
                            </div>
                        </div>
                        {/* <button className='create-user-button' type="submit">Create User</button> */}
                        <Button type='submit' className="button">
                            Create User
                        </Button>
                    </form>
                </div>
                : <AdminModal
                    show={show}
                    handleClose={handleClose}
                    body={"New User Created"}
                />}
        </div>
    )
}

import React, { useState } from 'react'
import './AdminPage.scss'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import AdminModal from '../../components/AdminModal/AdminModal'
import { writeUserData } from '../../firebase';

export default function AdminPage() {
    
    const [form, setForm] = useState({
        name:'',
        email: '',
        userID: '',
        type: '',
        password: '',
        confirm: ''
    })
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
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

        //function to add user to authenticated user database
        await createUserWithEmailAndPassword(detachedAuth, form.email, form.password)
        
        //function to add user to real-time database
        writeUserData(form.userID, form.name, form.email, form.type)

        setForm({
           userID: '',
           name: '',
           email: '',
           type: '', 
           password: '', 
           confirm: ''
        })
       handleShow(true)
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
                <>
                    <h6>AdminPage</h6>
                    <form className='new-user-form' onSubmit={handleSubmit}>
                        <label htmlFor="UserID">UserID:</label>
                        <input type="text" value={form.userID} onChange={ e => setField('userID', e.target.value) } name="userID" />

                        <label htmlFor="fname">Name:</label>
                        <input type="text" value={form.name} onChange={ e => setField('name', e.target.value) } name="fname" />

                        <label htmlFor="email" >Email:</label>
                        <input type="text" value={form.email} onChange={ e => setField('email', e.target.value) } name="email" />

                        <label htmlFor="type">Type: Admin or Tech</label>
                        <input type="text" value={form.type} onChange={ e => setField('type', e.target.value) } name="type" />

                        <label htmlFor="password">Password:</label>
                        <input type="password" value={form.password} onChange={ e => setField('password', e.target.value) } name="password" />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" value={form.confirm} onChange={ e => setField('confirm', e.target.value) }name="confirmPassword" />

                        <button type="submit">Apply</button>
                    </form>
                </>
                : <AdminModal
                    show={show}
                    handleClose={handleClose}
                />}
        </div>
    )
}

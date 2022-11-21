import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import './AdminUpdateDetailsPage.scss'
export default function AdminUpdateDetailsPage() {
    const [res, setRes] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { userId } = useParams()

    useEffect(() => {
        axios.
            post("http://localhost:8080/admin/userDetails", {
                userId
            })
            .then(response => {
                console.log("line15res", response.data)
                setRes(response.data)
                setEmail(response.email)
            })
    }, [])

    const applyHandler = async (e) => {
        e.preventDefault()
        await axios
            .post("http://localhost:8080/admin/update", {
                userId,
                email, 
                //password
            })
        console.log("test3")
        //UpdateUserData(checkedEmails
    }

    return (
        res ?
            <div>
                <h5>Update User Details Page For:</h5>
                <p>{res.email}</p>
                <form onSubmit={applyHandler} className='edit-user-form'>
                    <p className='edit-user-form_email'>Email:</p>
                    <input className='edit-user-form_input' placeholder={res.email} value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    <p className='edit-user-form_email'>Password:</p>
                    <input className='edit-user-form_input' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Edit Password'></input>
                    <button>Apply Changes</button>
                </form>
            </div>
            : ""

    )
}

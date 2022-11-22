import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import './AdminUpdateDetailsPage.scss'
import { UpdateUserData } from '../../firebase'
import AdminModal from '../../components/AdminModal/AdminModal'

export default function AdminUpdateDetailsPage() {
    const [res, setRes] = useState(null)
    const [type, setType] = useState(null)
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        window.location.reload()
    }
    const handleShow = () => setShow(true);

    const { userId } = useParams()

    useEffect(() => {
        axios.
            post("http://localhost:8080/admin/userDetails", {
                userId
            })
            .then(response => {
                setRes(response.data)
                setEmail(response.data.email)
            })
    }, [])

    const onChangeValue = (e) => {
        setType(e.target.value)
    }
    const applyHandler = async (e) => {
        e.preventDefault()
        if (type !== null && email !== '') {
            //update email and type in firebase real-time DB
            await axios
                .post("http://localhost:8080/admin/update", {
                    userId,
                    email,
                    newPassword
                })
            let updatedUser = {
                oldEmail: res.email,
                updatedEmail: email,
                type: type
            }
            console.log(updatedUser)
            //update user in authenticated users list on firebase
            UpdateUserData(updatedUser)
            handleShow()
        }
    }


    return (
        show ?
            <AdminModal
                show={show}
                handleClose={handleClose}
                body={"User Updated"}
            /> :
            res ?
                <div>
                    <h5>Update User Details Page For:</h5>
                    <p>{res.email}</p>
                    <form onSubmit={applyHandler} className='edit-user-form'>
                        <p className='edit-user-form_email'>Email:</p>
                        <input className='edit-user-form_input' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <p className='edit-user-form_email'>Password:</p>
                        <input className='edit-user-form_input' type='password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} placeholder='Edit Password'></input>
                        <div className='radio-buttons' onChange={onChangeValue}>
                            <p>User Type:</p>
                            <div className='type-radio'>
                                <input className='type-input' type="radio" value="Admin" name="type" />
                                <p className='type-radio_text'>Admin</p>
                            </div>
                            <div className='type-radio'>
                                <input className='type-input' type="radio" value="Tech" name="type" />
                                <p className='type-radio_text'>Tech</p>
                            </div>
                        </div>
                        <button>Apply Changes</button>
                    </form>
                </div>
                : ""

    )
}

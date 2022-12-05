import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import './AdminUpdateDetailsPage.scss'
import { UpdateUserData } from '../../firebase'
import AdminModal from '../../components/AdminModal/AdminModal'
import Button from "react-bootstrap/Button";
import Navigation from '../../components/Navigation/Navigation';
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

                <div className='report'>
                    <Navigation/>
                    <div className='update-user-header'>
                        <h5 className='update-user-header__text'>Update User Details For:</h5>
                        <p className='update-user-header__text'>{res.email}</p>
                    </div>
                    <form onSubmit={applyHandler} className='edit-user-form'>
                        {/* <p className='edit-user-form_email'>Email:</p>
                        <input className='edit-user-form_input' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <p className='edit-user-form_email'>Password:</p>
                        <input className='edit-user-form_input' type='password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} placeholder='Edit Password'></input> */}
                        <div className='user-input'>
                            <label htmlFor="email" >Update Email:</label>
                            <input className='input' type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className='user-input'>
                            <label htmlFor="password">Update Password:</label>
                            <input className='input' type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Edit Password" />
                        </div>
                        <p className='radio-buttons-title'>User Type:</p>
                        <div className='radio-buttons' onChange={e => setType(e.target.value)}>

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
                        <Button type="submit">Apply Changes</Button>
                    </form>
                </div>
                : ""

    )
}

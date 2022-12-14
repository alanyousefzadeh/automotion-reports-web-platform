import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import './AdminUpdateDetailsPage.scss'
import { UpdateUserData, isUserTech } from '../../firebase'
import AdminModal from '../../components/AdminModal/AdminModal'
import Button from "react-bootstrap/Button";
import Navigation from '../../components/Navigation/Navigation';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';

export default function AdminUpdateDetailsPage() {
    const [res, setRes] = useState(null)
    const [type, setType] = useState(null)
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [show, setShow] = useState(false)
    const [isTech, setIsTech] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleClose = () => {
        setShow(false)
        window.location.reload()
    }
    const handleShow = () => setShow(true);

    const { userId } = useParams()

    useEffect(() => {
        setIsLoading(true)
        axios.
            post(process.env.REACT_APP_ADMIN_USER_DETAILS_URL, {
                userId
            })
            .then(response => {
                setRes(response.data)
                setEmail(response.data.email)
                isUserTech(response.data.email, setIsTech)
                .then(()=> {
                    isTech ? setType("Tech") : setType("Admin")
                    setIsLoading(false) 
                })    
            })
    
    }, [])

    const applyHandler = async (e) => {
        e.preventDefault()
        if (type !== null && email !== '') {
            //update email and type in firebase real-time DB
            await axios
                .post(process.env.REACT_APP_ADMIN_UPDATE_URL, {
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
            isLoading ? <LoadingSpinner/> :

                <div className='report'>
                    <Navigation/>
                    <div className='update-user-header'>
                        <h5 className='update-user-header__text'>Update User Details For:</h5>
                        <p className='update-user-header__text'>{res.email}</p>
                        <p>This user's current status: {isTech ? "Tech" : "Admin"}</p>
                    </div>
                    <form onSubmit={applyHandler} className='edit-user-form'>
                       
                        <div className='user-input'>
                            <label htmlFor="email" >Update Email:</label>
                            <input className='input' type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className='user-input'>
                            <label htmlFor="password">Update Password:</label>
                            <input className='input' type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Edit Password" />
                        </div>
                        <p className='radio-buttons-title'>User Type:</p>
                        <div className='radio-buttons'>

                            <div className='radio-selectios'>
                                <div className='type-radio'>
                                    <input className='type-input' onChange={e => setType(e.target.value)} type="radio" value="Admin" name="type" />
                                    <p className='type-radio_text'>Admin</p>
                                </div>
                                <div className='type-radio'>
                                    <input className='type-input' onChange={e => setType(e.target.value)} type="radio" value="Tech" name="type" />
                                    <p className='type-radio_text'>Tech</p>
                                </div>
                            </div>
                        </div>
                        <Button type="submit">Apply Changes</Button>
                    </form>
                </div>
                

    )
}

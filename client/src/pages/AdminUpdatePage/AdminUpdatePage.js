import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './AdminUpdate.scss'
import Button from "react-bootstrap/Button";
import Navigation from '../../components/Navigation/Navigation';

export default function AdminUpdatePage() {
    const [res, setRes] = useState(null)
    useEffect(() => {
        axios.
            get(process.env.REACT_APP_ADMIN_LIST_URL)
            .then(response => {
                console.log(response.data)
                setRes(response.data)
            })
    }, [])

    const nav = useNavigate()
    const clickHandler = (user) => {
        nav(`${user[0]}`)
    }

    return (
        res ?
            <div className='admin-update-page'>
                <Navigation/>
                <ul className='admin-update-list'>
                    {
                        res.map((user, i) => {
                            return (
                                <div className='edit-user' key={i}>
                                    <Button className="edit-user_button" onClick={()=>clickHandler(user)}>Edit</Button>
                                    <p className='edit-user_email'>{user[1]}</p>  
                                </div>
                            )
                        })}
                </ul>
                
            </div>
            : ""
    )
}

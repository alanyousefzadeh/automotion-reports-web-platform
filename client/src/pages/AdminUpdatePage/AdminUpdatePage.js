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
            get("http://localhost:8080/admin/list")
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
            <div>
                <Navigation/>
                <ul>
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

import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './AdminUpdate.scss'
import Button from "react-bootstrap/Button";

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
                <ul>
                    {
                        res.map((user, i) => {
                            return (
                                <div className='edit-user' key={i}>
                                    {/* <input onChange={checkHandler} type="checkbox" id="email" name="email" value={user} /> */}
                                    <Button className="edit-user_button" onClick={()=>clickHandler(user)}>Edit</Button>
                                    <p className='edit-user_email'>{user[1]}</p>  
                                </div>
                            )
                        })}
                </ul>
                {/* <button onClick={applyHandler}>Apply</button> */}
            </div>
            : ""
    )
}

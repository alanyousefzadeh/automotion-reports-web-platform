import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import './AdminDeletePage.scss'

export default function AdminDeletePage() {
    const [res, setRes] = useState(null)
    useEffect(() => {
        axios.
            get("http://localhost:8080/admindelete")
            .then(response => {
                console.log(response.data)
                setRes(response.data)
            })
    }, [])

    let checkedEmails = []
    const checkHandler = (e) => {
        // to find out if it's checked or not; returns true or false
        const checked = e.target.checked;
        // to get the checked value
        const checkedValue = e.target.value;

        if (checked) {
            checkedEmails.push(checkedValue)
        }

        else if (!checked) {
            checkedEmails.pop(checkedValue)
        }
        console.log(checkedEmails)
    }

    let emailArray = []
    return (
        res ?
            <div>
                <ul>
                    {
                        res.map((email, i) => {
                            return (
                                <div>
                                    <input onChange={checkHandler} type="checkbox" id="email" name="email" value={`${email}`} />
                                    <label htmlFor="email">{email}</label>
                                </div>
                            )
                        })}
                </ul>
                <button>Apply</button>
            </div>
            : ""
    )
}

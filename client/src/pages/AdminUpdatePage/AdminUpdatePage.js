import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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

    const applyHandler = async () => {
        await axios
            .post("http://localhost:8080/admin/update", {
                
            })

            console.log("test3")
            //UpdateUserData(checkedEmails)
            console.log("test4")
    }

    return (
        res ?
            <div>
                <ul>
                    {
                        res.map((user, i) => {
                            return (
                                <div key={i}>
                                    {/* <input onChange={checkHandler} type="checkbox" id="email" name="email" value={user} /> */}
                                    <Link to={`${user[0]}`}>{user[1]}</Link>
                                </div>
                            )
                        })}
                </ul>
                <button onClick={applyHandler}>Apply</button>
            </div>
            : ""
    )
}

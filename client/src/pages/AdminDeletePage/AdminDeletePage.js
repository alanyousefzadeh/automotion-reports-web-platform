import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import './AdminDeletePage.scss'
import { removeUserData } from '../../firebase'

export default function AdminDeletePage() {
    const [res, setRes] = useState(null)
    useEffect(() => {
        axios.
            get("http://localhost:8080/admin/list")
            .then(response => {
                console.log(response.data)
                setRes(response.data)
            })
    }, [])

    let checkedEmails = []
    let IdsOfCheckedEmails = []
    const checkHandler = (e) => {

        // to find out if it's checked or not; returns true or false
        const checked = e.target.checked;
        console.log(checked)
        // to get the checked value
        const checkedValue = e.target.value;
        console.log(checkedValue)

        if (checked) {
            checkedEmails.push(checkedValue.split(",")[1])
            IdsOfCheckedEmails.push(checkedValue.split(",")[0])
        }

        else if (!checked) {
            checkedEmails = checkedEmails.filter(function (email) {
                return email !== checkedValue.split(",")[1] ;
            });      
            
            IdsOfCheckedEmails = IdsOfCheckedEmails.filter(function (email) {
                return email !== checkedValue.split(",")[0] ;
            });
        }
        console.log(checkedEmails)
        console.log(IdsOfCheckedEmails)
    }

    const applyHandler = async () => {
        // await axios
        //     .post("http://localhost:8080/admin/delete", {
        //         IdsOfCheckedEmails
        //     })

            console.log("test3")
            removeUserData(checkedEmails)
            console.log("test4")
    }
    let emailArray = []
    return (
        res ?
            <div>
                <ul>
                    {
                        res.map((user, i) => {
                            return (
                                <div key={i}>
                                    <input onChange={checkHandler} type="checkbox" id="email" name="email" value={user} />
                                    <label htmlFor="email">{user[1]}</label>
                                </div>
                            )
                        })}
                </ul>
                <button onClick={applyHandler}>Apply</button>
            </div>
            : ""
    )
}

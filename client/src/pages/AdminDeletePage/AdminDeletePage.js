import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminDeletePage.scss'
import { removeUserData } from '../../firebase'
import Navigation from '../../components/Navigation/Navigation'
import AdminModal from '../../components/AdminModal/AdminModal'
import { Button } from 'react-bootstrap'

export default function AdminDeletePage() {
    const [res, setRes] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        window.location.reload()
    }
    const handleShow = () => setShow(true);

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
                return email !== checkedValue.split(",")[1];
            });

            IdsOfCheckedEmails = IdsOfCheckedEmails.filter(function (email) {
                return email !== checkedValue.split(",")[0];
            });
        }
        console.log(checkedEmails)
        console.log(IdsOfCheckedEmails)
    }

    const applyHandler = async () => {
        await axios
        .post("http://localhost:8080/admin/delete", {
            IdsOfCheckedEmails
        })
        console.log("test3")
        removeUserData(checkedEmails)
        handleShow()
    }

    return (
        show ?
            <AdminModal
                show={show}
                handleClose={handleClose}
                body={"User(s) Deleted"}
            /> :
            res ?
                <div className='report'>
                    <Navigation />
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
                    <Button className='delete-button' onClick={applyHandler}>Delete</Button>
                </div>
                : ""

    )
}

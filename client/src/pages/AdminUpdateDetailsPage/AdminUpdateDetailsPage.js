import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

export default function AdminUpdateDetailsPage() {
    const [res, setRes] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        axios.
            post("http://localhost:8080/admin/userDetails", {
                userId
            })
            .then(response => {
                console.log(response.data)
                setRes(response.data)
            })
    }, [])

  return (
    <div>
        <h1>Update User Details Page</h1>
        <p>{userId}</p>
        <form>
            Email:<input></input><br/>
            Password:<input></input>
        </form>
    </div>
  )
}

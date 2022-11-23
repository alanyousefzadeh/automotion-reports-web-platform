import React, {useState} from 'react'
import {UserAuth} from "../Context/AuthContext";
import './EmailComponent.scss'
import Button from "react-bootstrap/Button";
import {base64Email} from "../EmailSender/EmailPdf";

export default function EmailComponent() {
    const [to , setTo] = useState("")
    const [body , setBody] = useState("")
    const currentUser = UserAuth().user.email
  return (
    <div>
      <form className="emailForm">
        <p className='emailForm_text'>From: {currentUser}</p>
        <p className='emailForm_text'>To: <input onChange={e=>setTo(e.target.value)} value={to} className='emailForm_to' type="text" placeholder="Enter email address" /></p>
        <textarea onChange={e=>setBody(e.target.value)} value={body} className='emailForm_text_input'name="comment" placeholder='Add message...'></textarea>
        <Button onClick={()=>base64Email(currentUser,to,body)} className="emailForm_button">
            Send Report as Email

        </Button>
      </form>
    </div>
  );
}

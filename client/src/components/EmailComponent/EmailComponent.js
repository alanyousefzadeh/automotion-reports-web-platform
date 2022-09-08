import React from 'react'
import {UserAuth} from "../Context/AuthContext";
import './EmailComponent.scss'
import Button from "react-bootstrap/Button";

export default function EmailComponent() {
  return (
    <div>
      <form className="emailForm">
        <p className='emailForm_text'>From: {UserAuth().user.email}</p>
        <p className='emailForm_text'>To: <input className='emailForm_to' type="text" placeholder="Enter email address" /></p>
        <textarea className='emailForm_text_input'name="comment" placeholder='Add message...'></textarea>
        <Button className="emailForm_button">
            Send Report as Email
        </Button>
      </form>
    </div>
  );
}

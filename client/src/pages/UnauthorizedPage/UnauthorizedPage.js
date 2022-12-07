import React from 'react'
import './UnauthorizedPage.scss'

export default function UnauthorizedPage() {
  return (
    <div>
        <p>Unauthorized Page</p> 
        <p>Please click <a className='unauthorized-link' href='/welcome'>here</a> to return to home page</p>
    </div>
  )
}

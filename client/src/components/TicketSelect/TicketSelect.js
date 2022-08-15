import React from 'react'
import { Form } from 'react-bootstrap';
import './TicketSelect.scss';

export default function TicketSelect(props) {
  const {label, num, setNum} = props

  return (
    <div className="sm-4 ticket-select">
      <Form.Group controlId="ticket">
        <Form.Label className="mb-0">{label}</Form.Label>
        <Form.Control
          type="text"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        >
        </Form.Control>
      </Form.Group>
    </div>
    
  )
}

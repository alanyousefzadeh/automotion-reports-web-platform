import { useState} from 'react';
import React from 'react'
import { Form } from 'react-bootstrap';

function DatePicker(props) {
    const {label, setDate} = props;

    return (
    
        <div>
            <Form.Group controlId="date">
                <Form.Label className='mb-0'>{label}</Form.Label>
                <Form.Control type="date" name="date" placeholder="Date" onChange={e => setDate(e.target.value)} />
            </Form.Group>
        </div>

    );
  }
  export default DatePicker;
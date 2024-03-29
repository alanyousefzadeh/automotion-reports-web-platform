import React from 'react'
import { Form } from 'react-bootstrap';
import './DatePicker.scss'

function DatePicker(props) {
    const {label, setDate} = props;

    return (
    
        <div className='sm-4 date-picker'>
            <Form.Group controlId="date">
                <Form.Label className='mb-0'>{label}</Form.Label>
                <Form.Control type="date" name="date" placeholder="Date" onChange={e => setDate(e.target.value)} />
            </Form.Group>
        </div>

    );
  
  }
  export default DatePicker;
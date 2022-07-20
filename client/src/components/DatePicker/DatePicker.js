import React from 'react'
import { Form } from 'react-bootstrap';

function DatePicker(props) {
    const {label, setDate} = props;

    return (
    
        <div className='sm-4'>
            <Form.Group controlId="date">
                <Form.Label className='mb-0'>{label}</Form.Label>
                <Form.Control type="date" name="date" placeholder="Date" onChange={e => setDate(new Date(`${e.target.value} 03:00:00`).getTime())} />
            </Form.Group>
        </div>

    );
  
  }
  export default DatePicker;
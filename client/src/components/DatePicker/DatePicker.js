import { useState} from 'react';
import React from 'react'
import { Form } from 'react-bootstrap';

function DatePicker(props) {
    const {label, setDate} = props;

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <Form.Group controlId="date">
                        <Form.Label>{label}</Form.Label>
                        <Form.Control type="date" name="date" placeholder="Date" onChange={e => setDate(e.target.value)} />
                    </Form.Group>
                </div>
            </div>
        </div>
    );
  }
  export default DatePicker;
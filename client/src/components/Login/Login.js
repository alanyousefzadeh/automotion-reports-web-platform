import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";


function Login() {

    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    //function to update the state of the form
    const setField = (field, value) => {
        //This will update our state to keep all the current form values, then add the newest form value to the correct key location
        setForm({
          ...form,
          [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
          setErrors(newErrors)
        } else {
          // No errors!
          alert('logging in')
        }
      }

    const findFormErrors = () => {
        const { email, password} = form
        const newErrors = {}
        // email errors: null, blank, or invalid email format
        let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ( !email || email === '' || !email.match(emailformat) ) newErrors.email = 'please provide a valid email address'
        //password errors
        if ( !password || password === '' ) newErrors.password = 'please provide a password'
    
        return newErrors
    }

    return (
        <Form className='my-5 mx-auto' style={{width: 300}}  noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email } />
                <Form.Control.Feedback type='invalid'>
                    { errors.email }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password } />
                <Form.Control.Feedback type='invalid'>
                    { errors.password }
                </Form.Control.Feedback>
            </Form.Group>
            <Button style={{width:300}} variant="primary" type="submit">
                Log In
            </Button>
      </Form>
        
    );
}

export default Login;
import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
   
    //function to POST login credentials to login API
    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/login', {
                email,
                password
            })
            //if the credentials are valid, store them in session storage for later use
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                setSuccess(true)
                event.target.reset();
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
      </Form>
        
    );
}

export default Login;
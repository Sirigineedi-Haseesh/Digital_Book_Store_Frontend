import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // Correct import
import { authenticate } from '../../Services/UserService';

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitregister = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const handleSubmitform = (event) => {
    event.preventDefault();
    authenticateUser();
  };

  const handleChange = (e) => {
    const login = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(login);
  };

  const authenticateUser = async () => {
    try {
      const response = await authenticate(user);
      console.log("Authentication Response:", response);

      if (response && response.token) {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
        console.log("JWT Token from login:", token);

        const decodedToken = jwtDecode(token);
        localStorage.setItem('username', decodedToken.sub);
        console.log("Username:", decodedToken.sub);
        console.log("Role:", decodedToken.role);

        // Redirect based on role
        if (decodedToken.role === "ROLE_ADMIN") {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        setErrorMessage("Invalid username/password. Please try again!");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Invalid username/password. Please try again!");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-75 shadow-lg">
        <Col md={6} className="p-5 bg-white">
          <div className="text-start mb-4">
            <img src="logo.jpg" alt="Book Store" width="50" height="50" />
            <label style={{ fontFamily: 'Times New Roman' }}>PageNest</label>
          </div>
          <h2 className="text-center mb-4">Login to Your Account</h2>
          <hr />
          {errorMessage && (
            <div className="alert alert-danger text-center mt-3 animate__animated animate__fadeIn">
              {errorMessage}
            </div>
          )}
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Enter your username"
                className="rounded-pill"
                style={{ backgroundColor: 'rgb(239, 235, 229)' }}
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="rounded-pill"
                style={{ backgroundColor: 'rgb(239, 235, 229)' }}
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3" onClick={handleSubmitform}>
              Sign In
            </Button>
          </Form>
        </Col>
        <Col
          md={6}
          className="p-5 d-flex flex-column align-items-center justify-content-center"
          style={{ backgroundColor: 'rgb(239, 235, 229)' }}
        >
          <h3>New Here?</h3>
          <p>Sign up and discover new opportunities!</p>
          <Button variant="outline-primary" className="mt-3" onClick={handleSubmitregister}>
            Sign Up
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

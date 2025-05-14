import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // Backend connection
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveUser } from '../services/UserService';

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    address: '',
    password: '',
    repeatPassword: '',
    terms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.username.length < 3 || formData.username.length > 20) {
      setErrorMessage("Username must be between 3 to 20 characters!");
      setIsLoading(false);
      return;
    }
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Please enter a valid email address!");
      setIsLoading(false);
      return;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }
    if (!formData.terms) {
      setErrorMessage("You must agree to the terms of service!");
      setIsLoading(false);
      return;
    }
    if(formData.email == null || formData.email == undefined || formData.email == "") {
      setErrorMessage("Email is required!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await saveUser({
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        password: formData.password,
        role: "USER",
      });
    
      if (response) {
        console.log("Account created successfully!", response);
        navigate('/'); // Redirect upon successful signup
      }
    } catch (error) {
      console.error("Error saving user:", error);
    
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Failed to create account. Please try again.");
      }
    }
    finally {
      setIsLoading(false); // ✅ Stop loading after response
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body" style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
          
          {/* Book Store Logo & Label */}
          <div className="text-center mb-4">
            <img src="logo.jpg" alt="Book Store" width="50" height="50" />
            <label style={{ fontFamily: 'Times New Roman', fontSize: '20px', marginLeft: '10px' }}>
              PageNest
            </label>
          </div>

          {isLoading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}

          {/* Form Heading */}
          <h2 className="text-center mb-4">CREATE ACCOUNT</h2>

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="terms" checked={formData.terms} onChange={handleChange} required />
              <label className="form-check-label" htmlFor="terms">I agree to the Terms of Service</label>
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit} disabled={isLoading} >{isLoading ? "Submitting..." : "SIGN UP"}</button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-3">
            Have an account? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;

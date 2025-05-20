import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// Correct path for UserService
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert'; // Correct path for ErrorAlert
import { saveUser } from '../../Services/UserService';

const CreateAccountForm = () => {
  const navigate = useNavigate(); //initialize hook used for navigation
  // State variables for form data and loading state
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
  // State variable for error message
  const [errorMessage, setErrorMessage] = useState("");

  // This function updates the formData state based on user input
  const handleChange = (e) => {
   
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };
  
  // This function handles the form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    setIsLoading(true);
    // Validate username length
    if (formData.username.length < 3 || formData.username.length > 20) {
      setErrorMessage("Username must be between 3 to 20 characters!");
      // stops the loading spinner 
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Please enter a valid email address!");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setErrorMessage("");
      setErrorMessage("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    // Validate password match
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("");
      setErrorMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    // Validate terms agreement
    if (!formData.terms) {
      setErrorMessage("You must agree to the terms of service!");
      setIsLoading(false);
      return;
    }

    //collects user registration details via a form and submits it using the saveUser function.
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
        setErrorMessage(typeof error.response.data === 'string' ? error.response.data : "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading after response
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(239, 235, 229)" }}>
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
          <ErrorAlert message={errorMessage} />

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
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
              <input type="password" className="form-control" id="repeatPassword" placeholder="Repeat your password" value={formData.repeatPassword} onChange={handleChange} required />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="terms" checked={formData.terms} onChange={handleChange} required />
              <label className="form-check-label" htmlFor="terms">I agree to the Terms of Service</label>
            </div>

            {/* Disables the button when the form is submitting, preventing multiple clicks. */}
            <button type="submit" className="btn btn-primary w-100" >
              {isLoading ? "Submitting..." : "SIGN UP"}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => {
                setFormData({
                  username: '',
                  fullName: '',
                  email: '',
                  address: '',
                  password: '',
                  repeatPassword: '',
                  terms: false,
                });
                setErrorMessage('');
              }}
              disabled={isLoading}
            >
              RESET
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-3">
            Have an account? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateAccountForm;

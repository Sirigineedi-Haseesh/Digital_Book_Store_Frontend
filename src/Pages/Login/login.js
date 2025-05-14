// In your Pages/Login/login.js (no changes needed here for the logout issue)
import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../Services/UserService';
import 'animate.css';
import { jwtDecode } from "jwt-decode";

function LoginPage({ onLogin }) { // Receive onLogin prop
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Assuming your token contains a 'role' claim
        const userRole = decodedToken.role;
        if (userRole === 'admin') {
          navigate('/admin/dashboard'); // Example admin route
        } else {
          navigate('/home'); // Default user homepage
        }
      } catch (error) {
        // Token is invalid or expired, allow login to proceed
        setIsLoading(false);
      }
    } else {
      // No token, allow login to proceed
      setIsLoading(false);
    }
  }, [navigate, onLogin]); // Include onLogin in dependency array

  const handleRegisterClick = (event) => {
    event.preventDefault();
    navigate('/signup'); // Corrected navigation path
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the login process starts
    try {
      const response = await authenticate(user);
      if (response && response.token) {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('username', user.username); // Store username in local storage
        onLogin(true); // Update login status in App
        const decodedToken = jwtDecode(token);

        const userRole = decodedToken.role;
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/home');
        }
      } else if (response && response.message) {
        setErrorMessage(response.message);
        setIsLoading(false); // Set loading to false if login fails
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
        setIsLoading(false); // Set loading to false if login fails
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage("Invalid username or password. Please try again.");
      setIsLoading(false); // Set loading to false if there's an error during login
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="loginPageContainer">
      <div className="loginCard">
        <div className="loginCardLeft">
          <div className="brand">
            <img src="/logo.jpg" alt="Book Store" className="brandLogo" /> {/* Assuming logo.jpg is in the public folder */}
            <span className="brandName">PageNest</span>
          </div>
          <h2 className="loginTitle">Sign in to your account</h2>
          <hr className="divider" />
          {errorMessage && (
            <div className={`alert alert-danger text-center mt-3 animate__animated animate__fadeIn`}>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="loginForm">
            <div className="formGroup">
              <label htmlFor="username" className="formLabel">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="formControl"
                value={user.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="formLabel">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="formControl"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="signInButton">
              Sign In
            </button>
          </form>
        </div>
        <div className="loginCardRight">
          <h3 className="newHereTitle">New Here?</h3>
          <p className="newHereText">Sign up and unlock a world of books and opportunities!</p>
          <button className="signUpButton" onClick={handleRegisterClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
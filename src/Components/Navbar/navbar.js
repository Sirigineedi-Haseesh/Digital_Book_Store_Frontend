// In your Components/Navbar/navbar.js:
import React, { useRef, useEffect, useState } from 'react';
import { Toolbar, IconButton, Badge, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Change default import to named import// Ensure SearchBar is correctly exported
import "./navbar.css";
import "../../variables.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { CgProfile } from "react-icons/cg";
import PropTypes from 'prop-types';
 
const Navbar = ({ isLoggedIn, onLogout, cartBadge }) => { // Receive cartBadge prop
  const cartRef = useRef(null);
  const [theme, setTheme] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
 
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && isLoggedIn) { // Check isLoggedIn as well
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.sub);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUsername('');
      }
    } else {
      setUsername('');
    }
  }, [isLoggedIn]);
 
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
 
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
 
  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    onLogout(); // Call the onLogout function passed from App
    setUsername('');
    handleProfileMenuClose();
    navigate('/home'); // Redirect to home after sign out
  };
 
  return (
    <div position="fixed" className="appBar" color='#dbd3c8'>
      <Toolbar className="toolbar">
        <Typography variant="h6" color="inherit" className="title">
          <span>P</span>age<span>N</span>est
        </Typography>
        <div style={{ flexGrow: 1 }} />
 
        <Button component={Link} to="/home" className="homeButton" color="inherit">Home</Button>
        <Button component={Link} to="/order" className="orderButton" color="inherit">Orders</Button>
 
        <Button component={Link} to="/products" color="inherit">Products</Button>
        <IconButton component={Link} to="/cart" color="inherit" ref={cartRef} className="cartButton" aria-label="cart">
          <Badge badgeContent={cartBadge} color="secondary" className="badge">
            <ShoppingCart />
          </Badge>
        </IconButton>
 
        {isLoggedIn && (
          <Typography color="inherit" style={{ marginRight: '8px' }}>Hi, {username}</Typography>
        )}
 
        <IconButton onClick={handleProfileClick} color="inherit">
          <CgProfile />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          {isLoggedIn ? (
            <>
              <MenuItem component={Link} to="/userProfile" onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/login" onClick={handleProfileMenuClose}>Login</MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleProfileMenuClose}>Register</MenuItem>
            </>
          )}
        </Menu>
 
        <IconButton onClick={toggleTheme} color="inherit">
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </div>
  );
};
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  cartBadge: PropTypes.number.isRequired,
};
 
export default Navbar;
 
 
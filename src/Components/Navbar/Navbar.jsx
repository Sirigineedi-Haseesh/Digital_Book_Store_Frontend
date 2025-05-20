import React, { useRef, useEffect, useState } from 'react';
import { Toolbar, IconButton, Badge, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure this is correctly imported
import "./Navbar.css";
import "../../Variables.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { CgProfile } from "react-icons/cg";
import PropTypes from 'prop-types';
 
const Navbar = ({ isLoggedIn, onLogout, cartBadge }) => {
  const cartRef = useRef(null);
  const [theme, setTheme] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(''); // State to store the user's role
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
 
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && isLoggedIn) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.sub);
        setRole(decodedToken.role); // Assuming the role is stored in the token
      } catch (error) {
        console.error("Error decoding token:", error);
        setUsername('');
        setRole('');
      }
    } else {
      setUsername('');
      setRole('');
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
    setRole('');
    handleProfileMenuClose();
    navigate('/login'); // Redirect to login page after sign out
    window.location.reload(); // Redirect to home after sign out
  };
 
 
  return (
    <div position="fixed" className="appBar" color='#dbd3c8'>
      <Toolbar className="toolbar">
        <Typography variant="h6" color="inherit" className="title">
          <span>P</span>age<span>N</span>est
        </Typography>
        <div style={{ flexGrow: 1 }} />
        {role==='ROLE_USER' && (
          <>
        <Button component={Link} to="/home" className="homeButton" color="inherit">Home</Button>
        <Button component={Link} to="/order" className="orderButton" color="inherit">Orders</Button>
        <Button component={Link} to="/products" color="inherit">Products</Button>
        </>
        )}
        {role === 'ROLE_ADMIN' && (
          <Button component={Link} to="/admin" className="adminButton" color="inherit">Admin Panel</Button>
        )}
        {/* Conditionally render the cart button only for non-admin users */}
        {role !== 'ROLE_ADMIN' && (
          <IconButton component={Link} to="/cart" color="inherit" ref={cartRef} className="cartButton" aria-label="cart">
            <Badge badgeContent={cartBadge} color="secondary" className="badge">
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}
 
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
          {isLoggedIn
            ? [
                <MenuItem
                  key="profile"
                  component={Link}
                  to="/userProfile"
                  onClick={handleProfileMenuClose}
                >
                  Profile
                </MenuItem>,
                <MenuItem key="signout" onClick={handleSignOut}>
                  Sign Out
                </MenuItem>,
              ]
            : [
                <MenuItem
                  key="login"
                  component={Link}
                  to="/login"
                  onClick={handleProfileMenuClose}
                >
                  Login
                </MenuItem>,
                <MenuItem
                  key="signup"
                  component={Link}
                  to="/signup"
                  onClick={handleProfileMenuClose}
                >
                  Register
                </MenuItem>,
              ]}
        </Menu>
 
        {/* <IconButton onClick={toggleTheme} color="inherit">
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton> */}
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
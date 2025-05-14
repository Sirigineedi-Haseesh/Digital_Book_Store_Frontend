// In your Components/Navbar/navbar.js:
import React, { useRef, useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Change default import to named import
import SearchBar from '../SearchBar/searchbar.js'; // Ensure SearchBar is correctly exported
import "./navbar.css";
import "../../variables.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { CgProfile } from "react-icons/cg";

const Navbar = ({ isLoggedIn, onLogout, cartBadge }) => { // Receive cartBadge prop
  const cartRef = useRef(null);
  const [theme, setTheme] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // State to hold categories

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

  useEffect(() => {
   
    if (isLoggedIn) {
      fetchCategories();
    } else {
      setCategories([]); // Clear categories when logged out
    }
  }, [isLoggedIn]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('YOUR_CATEGORIES_API_ENDPOINT');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

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
        <div className='searchbar'>
          <SearchBar />
        </div>
        <div style={{ flexGrow: 1 }} />

        <Button component={Link} to="/home" className="homeButton" color="inherit">Home</Button>

        {isLoggedIn && (
          <div className="dropdown">
            <Button className="listButton" color="inherit">Categories</Button>
            <div className="dropdown-content">
              <div className="dropdown-section">
                <Typography variant="subtitle1"><b>Fiction</b></Typography>
                <Link to="/categories/fiction-reads">Fiction Reads</Link>
                <Link to="/categories/adventure">Adventure</Link>
                <Link to="/categories/classics">Classics</Link>
                <Link to="/categories/mystery-crime-thriller">Mystery, Crime & Thriller</Link>
                <Link to="/categories/romance">Romance</Link>
                <Link to="/categories/young-adult">Young Adult</Link>
                <Link to="/categories/historical-fiction">Historical Fiction</Link>
                <Link to="/categories/horror-fantasy">Horror & Fantasy</Link>
                <Link to="/categories/erotic-fiction">Erotic Fiction</Link>
                <Link to="/categories/womens-fiction">Women's Fiction</Link>
              </div>
              <div className="dropdown-section">
                <Typography variant="subtitle1"><b>Non-Fiction</b></Typography>
                <Link to="/categories/biography">Biography</Link>
                <Link to="/categories/self-help">Self Help</Link>
                <Link to="/categories/business-management">Business & Management</Link>
                <Link to="/categories/health-fitness">Health & Fitness</Link>
                <Link to="/categories/spirituality">Spirituality</Link>
                <Link to="/categories/philosophy">Philosophy</Link>
                <Link to="/categories/history">History</Link>
                <Link to="/categories/travel-holiday">Travel & Holiday</Link>
                <Link to="/categories/science-nature">Science & Nature</Link>
              </div>
              <div className="dropdown-section">
                <Typography variant="subtitle1"><b>Coffee Table</b></Typography>
                <Link to="/categories/history">History</Link>
                <Link to="/categories/sports">Sports</Link>
                <Link to="/categories/food-beverage">Food & Beverage</Link>
                <Link to="/categories/interior-designing">Interior Designing</Link>
                <Link to="/categories/cars-motorcycles">Cars & Motorcycles</Link>
                <Link to="/categories/wildlife-nature">Wildlife & Nature</Link>
              </div>
              <div className="dropdown-section">
                <Typography variant="subtitle1"><b>Hindi Novels</b></Typography>
                <Link to="/categories/dictionary-language-studies">Dictionary & Language Studies</Link>
              </div>
              <div className="dropdown-section">
                <Typography variant="subtitle1"><b>Comics & Manga</b></Typography>
                <Link to="/categories/indian-comics">Indian Comics</Link>
                <Link to="/categories/american-comics">American Comics</Link>
              </div>
              <div className="dropdown-section">
                <Typography variant="subtitle1"><b>Children Books</b></Typography>
                <Link to="/categories/age-0-5">Age 0-5 Years</Link>
                <Link to="/categories/age-6-18">Age 6-18 Years</Link>
              </div>
            </div>
          </div>
        )}

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
              <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>Profile</MenuItem>
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

export default Navbar;
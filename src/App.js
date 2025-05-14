// In your App.js:
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import loadingImg from "./assets/loader.gif";

import Home from './Pages/Home/home';
import Profile from './Pages/Profile/profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cart from './Pages/Cart/cart';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Order from './Pages/Order/Order';
import LoginPage from './Pages/Login/login';
import Registration from './Pages/Registration/registration';
import Products from './Pages/Products/products'; // Import the Products page

import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import ProductView from './Pages/ProductView/productView';
import { CartProvider } from './context/CartContext'; // Corrected path

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));
  const [initialLoading, setInitialLoading] = useState(true); // For the very first load
  const [cartBadge, setCartBadge] = useState(0);

  const updateCartBadge = (totalItems) => {
    setCartBadge(totalItems);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          jwtDecode(token);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Invalid token", error);
          setIsLoggedIn(false);
          localStorage.removeItem('jwtToken');
        }
      } else {
        setIsLoggedIn(false);
      }
      setInitialLoading(false); // Initial check complete
    };

    checkAuth();
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false); // Update the state directly
  };

  if (initialLoading) {
    return (
      <div className="loader">
        <img src={loadingImg} alt="Loading" />
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} cartBadge={cartBadge} /> {/* Pass onLogout and cartBadge props */}
          <div className="App-content">
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />}
              />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />}
              />
              <Route
                path="/signup"
                element={isLoggedIn ? <Navigate to="/home" /> : <Registration />}
              />
              <Route path="/productView" element={<ProductView updateCartBadge={updateCartBadge} />} /> {/* Pass updateCartBadge prop */}
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              />

              <Route
                path="/cart"
                element={isLoggedIn ? <Cart updateCartBadge={updateCartBadge} /> : <Navigate to="/login" />} // Pass updateCartBadge prop
              />
              <Route
                path="/order"
                element={isLoggedIn ? <Order /> : <Navigate to="/login" />}
              />
              <Route
                path="/products"
                element={isLoggedIn ? <Products /> : <Navigate to="/login" />}
              />
              <Route
                path="/productview/:isbn" // Changed from :id to :isbn
                element={isLoggedIn ? <ProductView updateCartBadge={updateCartBadge} /> : <Navigate to="/login" />} // Pass updateCartBadge prop
              />
            
              {/* Add a route for categories if needed */}
              {isLoggedIn && <Route path="/category/:slug" element={<> {/* Your Category Page Component */}</>} />}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
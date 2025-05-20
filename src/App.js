import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';
import LoginPage from './Pages/AdminPages/Login';
import Registration from './Pages/AdminPages/Register';
import Products from './Pages/Products/Products';
import ProductView from './Pages/ProductView/ProductView';
import AdminPanel from './Pages/AdminPages/Admin';
import UserList from './Pages/AdminPages/RegisterdUsers';
import BooksPage from './Pages/AdminPages/ManageBooks';
import AddBookForm from './Pages/AdminPages/AddBook';
import EditBookForm from './Pages/AdminPages/EditBook';
import OrdersPage from './Pages/AdminPages/Orders';
import UserProfile from './Pages/AdminPages/UserProfile';
import EditProfile from './Pages/AdminPages/EditProfile';
import ReviewAndRating from './Pages/ReviewAndRating/ReviewAndRating';
import { CartProvider } from './context/CartContext';
import OrderDetails from './Pages/Order/OrderDetails';
function App() {
  const isLoggedIn = !!localStorage.getItem('jwtToken'); // Check if user is logged in by looking for JWT token in local storage
  const [cartBadge, setCartBadge] = useState(0); //keep track of the number of items in the cart

  const updateCartBadge = (totalItems) => {
    setCartBadge(totalItems);
  };
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove the JWT token
    localStorage.removeItem('username'); // Remove the username
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    // provides the cart context to all components
      <Router>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} cartBadge={cartBadge} />
          <div className="App-content">
            <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/productView" element={<ProductView updateCartBadge={updateCartBadge} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart updateCartBadge={updateCartBadge} />} />
              <Route path="/order" element={<Order />} />
              <Route path="/products" element={<Products updateCartBadge={updateCartBadge} />} />
              <Route path="/productview/:isbn" element={<ProductView updateCartBadge={updateCartBadge} />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/allusers" element={<UserList />} />
              <Route path="/managebooks" element={<BooksPage />} />
              <Route path="/addbooks" element={<AddBookForm />} />
              <Route path="/editbook/:title" element={<EditBookForm />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/reviewAndRating" element={<ReviewAndRating />} />
              <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import Home from './Pages/Home/home';
import Profile from './Pages/Profile/profile';
import Cart from './Pages/Cart/cart';
import Order from './Pages/Order/Order';
import LoginPage from './Pages/AdminPages/Login';
import Registration from './Pages/AdminPages/Register';
import Products from './Pages/Products/products';
import ProductView from './Pages/ProductView/productView';
import AdminPanel from './Pages/AdminPages/Admin';
import UserList from './Pages/AdminPages/RegisterdUsers';
import BooksPage from './Pages/AdminPages/ManageBooks';
import AddBookForm from './Pages/AdminPages/AddBook';
import EditBookForm from './Pages/AdminPages/EditBook';
import OrdersPage from './Pages/AdminPages/Orders';
import UserProfile from './Pages/AdminPages/UserProfile';
import EditProfile from './Pages/AdminPages/EditProfile';
import { CartProvider } from './context/CartContext';

function App() {
  const isLoggedIn = !!localStorage.getItem('jwtToken'); // Check if user is logged in
  const [cartBadge, setCartBadge] = useState(0);

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
    <CartProvider>
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
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
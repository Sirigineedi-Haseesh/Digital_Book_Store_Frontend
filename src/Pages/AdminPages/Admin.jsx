import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminCard from '../../Components/AdminCard';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AdminPanel = () => {
  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
      <div>
        {/* Navigation Bar */}
        {/* navbar: Base class for the navigation bar.
navbar-expand-lg: Makes the navbar responsive, expanding on large screens.
navbar-light: Applies light background and dark text.
bg-light: Sets a light background color. */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/*  container-fluid: Makes the container full-width and responsive.*/}
          <div className="container-fluid">
            <span className="navbar-brand">Admin Panel</span>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/allusers">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/managebooks">Books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">Orders</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <header className="d-flex justify-content-between align-items-center py-3">
            <h1>Admin Page</h1>
            <Link to="/userProfile" className="btn btn-outline-secondary">
              <i className="fas fa-user"></i> My Account
            </Link>
          </header>
          <div className="alert alert-success text-center" role="alert">
            Welcome to Admin Panel!
          </div>
          <div className="row">
            <AdminCard
              imageSrc="users.jpg"
              imageAlt="Registered Users"
              title="Registered Users"
              buttonText="View"
              buttonLink="/allusers"
            />
            <AdminCard
              imageSrc="SignupBackground.jpg"
              imageAlt="Books Management"
              title="Books"
              buttonText="View & Manage Books"
              buttonLink="/managebooks"
            />
            <AdminCard
              imageSrc="orders.jpg"
              imageAlt="Orders Management"
              title="Orders"
              buttonText="Orders"
              buttonLink="/orders"
            />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default AdminPanel;

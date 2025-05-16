import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminCard from '../../Components/AdminCard';

const AdminPanel = () => {
  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Admin Panel</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/allusers">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/managebooks">Books</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/orders">Orders</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <header className="d-flex justify-content-between align-items-center py-3">
          <h1>Admin Page</h1>
          <a href="/userProfile" className="btn btn-outline-secondary">
            <i className="fas fa-user"></i> My Account
          </a>
        </header>
        <div className="alert alert-success text-center" role="alert">
          Welcome to Admin Panel!
        </div>
        <div className="row">
          <AdminCard
            imageSrc="users.jpg"
            title="Registered Users"
            buttonText="View"
            buttonLink="/allusers"
          />
          <AdminCard
            imageSrc="SignupBackground.jpg"
            title="Books"
            buttonText="View & Manage Books"
            buttonLink="/managebooks"
          />
          <AdminCard
            imageSrc="orders.jpg"
            title="Orders"
            buttonText="Orders"
            buttonLink="/orders"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 mt-4">
        <p>&copy; 2025 BookStore. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default AdminPanel;

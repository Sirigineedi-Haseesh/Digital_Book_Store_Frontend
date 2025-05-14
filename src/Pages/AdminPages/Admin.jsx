import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  return (
    <div>
        <div className="container">
        <header className="d-flex justify-content-between align-items-center py-3">
            <h1>Admin Page</h1>
            <a href="#" className="btn btn-outline-secondary">
            <i className="fas fa-user"></i> My Account
            </a>
        </header>
        <div className="alert alert-success text-center" role="alert">
            Welcome to Admin Panel!
        </div>
        <div className="row">
            <div className="col-md-4">
            <div className="card text-center">
                <div className="card-body">
                <img src="users.jpg" alt="Book Store" width="150" height="150" />
                <h5 className="card-title">Registered Users</h5>
                <a href="/allusers" className="btn btn-success w-100">View</a>
                </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="card text-center">
                <div className="card-body">
                <img src="SignupBackground.jpg" alt="Book Store" width="150" height="150" style={{ borderRadius: '30px' }}/>
                <h5 className="card-title">Books</h5>
                <a href="/managebooks" className="btn btn-success w-100">View & Manage Books</a>
                </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="card text-center">
                <div className="card-body">
                <img src="orders.jpg" alt="Book Store" width="150" height="150" style={{ borderRadius: '30px' }}/>
                <h5 className="card-title">Orders</h5>
                <a href="/orders" className="btn btn-success w-100">Orders</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default AdminPanel;

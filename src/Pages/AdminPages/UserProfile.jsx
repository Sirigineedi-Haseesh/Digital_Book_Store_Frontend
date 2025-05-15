import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { getUser } from '../../Services/UserService';
 
const UserProfile = () => {
  const [userData, setUserProfile] = useState({
    username: '',
    email: '',
    address: '',
    role: ''
  });
 
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(localStorage.getItem("username"));
        console.log(localStorage.getItem("username"));
        setUserProfile(user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);
 
  const handleEdit = () => {
    navigate('/editProfile', { state: userData });
  };
 
  return (
    <div className="container mt-5">
      <div className="card profile-card shadow-lg">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h2 className="mb-0">User Profile</h2>
          <button className="btn btn-outline-primary" onClick={handleEdit}>
            <i className="fas fa-edit me-2"></i>Edit
          </button>
        </div>
        <div className="card-body">
          <div className="text-center mb-4">
            <i className="fas fa-user-circle fa-7x text-secondary"></i>
          </div>
          <div className="profile-details">
            <div className="profile-item mb-3"><strong>Username:</strong> {userData.username}</div>
            <div className="profile-item mb-3"><strong>Email:</strong> {userData.email}</div>
            <div className="profile-item mb-3"><strong>Address:</strong> {userData.address}</div>
            <div className="profile-item mb-3"><strong>Role:</strong> {userData.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default UserProfile;
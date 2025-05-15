import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../Services/UserService'; // You need to implement this
 
const EditProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    username: state.username,
    email: state.email,
    address: state.address,
    role: state.role
  });
 
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSave = async () => {
    try {
      await updateUser(localStorage.getItem("username"),formData);
      alert("Successfully updated"); // Implement this in your service
      navigate('/userProfile');
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
 
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3>Edit Profile</h3>
        <div className="form-group mb-3">
          <label>Username</label>
          <input className="form-control" value={formData.username} disabled />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input className="form-control" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
          <label>Address</label>
          <input className="form-control" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
          <label>Role</label>
          <input className="form-control" value={formData.role} disabled />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-success" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => navigate('/userProfile')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
 
export default EditProfile;
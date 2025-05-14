import React, { useState, useEffect, use } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsers, deleteUser, updateUserRole } from '../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username,role) => {
    try {
      if(role === "ADMIN") {
        alert("You cannot delete the admin user.");
      }
      else {
        if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
          await deleteUser(username);
          setUsers(users.filter(user => user.username !== username));
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAssignRole = async (username) => {
    const newRole = prompt('Enter new role for the user:');
    if (newRole) {
      try {
        if(newRole == "ADMIN" || newRole == "USER") {
          await updateUserRole(username, newRole);
          setUsers(users.map(user => 
            user.username === username ? { ...user, role: newRole } : user
          ));
        }
        else {
          alert("Invalid role. Please enter either 'ADMIN' or 'USER'.");
        }
      } catch (error) {
        console.error('Error updating user role:', error);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}>
       <div className="text-start mb-4">
            <img src="logo.jpg" alt='Book Store' width="50" height="50"/>
            <label style={{ fontFamily: 'Times New Roman' }}>PageNest</label>
          </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>USERNAME</th>
            <th>FULLNAME</th>
            <th>ADDRESS</th>
            <th>EMAILADDRESS</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm mx-3" 
                  onClick={() => handleDelete(user.username,user.role)}
                >
                  Delete
                </button>
                <button 
                  className="btn btn-warning btn-sm ml-2" 
                  onClick={() => handleAssignRole(user.username)}
                >
                  Assign Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary">Previous</button>
        <button className="btn btn-secondary">Next</button>
      </div>
    </div>
  );
};

export default UserList;

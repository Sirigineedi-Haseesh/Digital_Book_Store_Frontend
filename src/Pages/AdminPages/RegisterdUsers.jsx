import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsers, deleteUser, updateUserRole } from '../../Services/UserService';
import PageHeader from '../../Components/PageHeader'; // Import the PageHeader component
import LoadingSpinner from '../../Components/LoadingSpinner'; // Import the LoadingSpinner component
import ReusableTable from '../../Components/ReusableTable'; // Import the ReusableTable component
import ErrorAlert from '../../Components/ErrorAlert'; // Import the ErrorAlert component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(''); // State to track errors
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [usersPerPage] = useState(10); // Number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username, role) => {
    try {
      if (role === "ADMIN") {
        alert("You cannot delete the admin user.");
      } else {
        if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
          await deleteUser(username);
          setUsers(users.filter(user => user.username !== username));
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again later.');
    }
  };

  const handleAssignRole = async (username) => {
    const newRole = prompt('Enter new role for the user:');
    if (newRole) {
      try {
        if (newRole === "ADMIN" || newRole === "USER") {
          await updateUserRole(username, newRole);
          setUsers(users.map(user =>
            user.username === username ? { ...user, role: newRole } : user
          ));
        } else {
          alert("Invalid role. Please enter either 'ADMIN' or 'USER'.");
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        setError('Failed to update user role. Please try again later.');
      }
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define columns for the ReusableTable
  const columns = [
    { header: 'USERNAME', key: 'username' },
    { header: 'FULLNAME', key: 'fullName' },
    { header: 'ADDRESS', key: 'address' },
    { header: 'EMAILADDRESS', key: 'email' },
    { header: 'ROLE', key: 'role' },
  ];

  // Define actions for the ReusableTable
  const actions = [
    {
      label: 'Delete',
      variant: 'danger',
      onClick: (user) => handleDelete(user.username, user.role),
    },
    {
      label: 'Assign Role',
      variant: 'warning',
      onClick: (user) => handleAssignRole(user.username),
    },
  ];

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
    <div className="container mt-5" style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}>
      <PageHeader title="PageNest" /> {/* Use the PageHeader component */}
      <ErrorAlert message={error} /> {/* Use the ErrorAlert component */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
      </div>
      {loading ? ( // Show LoadingSpinner while loading
        <LoadingSpinner />
      ) : (
        <ReusableTable columns={columns} data={currentUsers} actions={actions} /> // Use ReusableTable
      )}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    </div>
  );
};

export default UserList;
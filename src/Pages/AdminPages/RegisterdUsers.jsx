import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsers, deleteUser, updateUserRole } from '../../Services/UserService';
import PageHeader from '../../Components/PageHeader/PageHeader';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ReusableTable from '../../Components/ReusableTable/ReusableTable';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const loggedInAdminUsername = 'adminUsername'; // Replace with the actual logged-in admin's username

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        // Filter out the logged-in admin from the user list
        const filteredUsers = data.filter(user => user.username !== localStorage.getItem('username'));
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      if (selectedUser.role === "ADMIN") {
        setError("You cannot delete the admin user.");
      } else {
        await deleteUser(selectedUser.username);
        setUsers(users.filter(user => user.username !== selectedUser.username));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again later.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleAssignRole = async () => {
    try {
      if (newRole === "ADMIN" || newRole === "USER") {
        await updateUserRole(selectedUser.username, newRole);
        setUsers(users.map(user =>
          user.username === selectedUser.username ? { ...user, role: newRole } : user
        ));
      } else {
        setError("Invalid role. Please enter either 'ADMIN' or 'USER'.");
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role. Please try again later.');
    } finally {
      setShowRoleModal(false);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole('');
    setShowRoleModal(true);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { header: 'USERNAME', key: 'username' },
    { header: 'FULLNAME', key: 'fullName' },
    { header: 'ADDRESS', key: 'address' },
    { header: 'EMAILADDRESS', key: 'email' },
    { header: 'ROLE', key: 'role' },
  ];

  const actions = [
    {
      label: 'Delete',
      variant: 'danger',
      onClick: (user) => openDeleteModal(user),
    },
    {
      label: 'Assign Role',
      variant: 'warning',
      onClick: (user) => openRoleModal(user),
    },
  ];

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
      <div className="container mt-5" style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}>
        <PageHeader title="PageNest" />
        <ErrorAlert message={error} />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>User List</h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ReusableTable columns={columns} data={currentUsers} actions={actions} />
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user {selectedUser?.username}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assign Role Modal */}
      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="newRole">Enter new role for {selectedUser?.username}:</label>
            <input
              type="text"
              id="newRole"
              className="form-control"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="container d-flex justify-content-between">
          <Button variant="secondary" className="w-100" onClick={() => setShowRoleModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="w-100" onClick={handleAssignRole}>
            Assign Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getOrders, updateOrderStatus, searchOrdersByDate, searchOrders } from '../../Services/OrderService';
import PageHeader from '../../Components/PageHeader/PageHeader';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ReusableTable from '../../Components/ReusableTable/ReusableTable';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [statusChange, setStatusChange] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusChange((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleSave = async (orderId) => {
    try {
      const newStatus = statusChange[orderId];
      if (newStatus) {
        await updateOrderStatus(orderId, newStatus);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        setStatusChange((prev) => {
          const updated = { ...prev };
          delete updated[orderId];
          return updated;
        });
        setSuccessMessage(`Order status updated to "${newStatus}" successfully!`);
        setShowSuccessModal(true); // Show success modal
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again later.');
    }
  };

  const handleSearch = async () => {
    try {
      let data = [];
      setError(null);

      if (searchDate && searchQuery) {
        data = await searchOrdersByDate(searchDate);
        data = data.filter((order) =>
          order.orderId.toString().includes(searchQuery) ||
          order.userId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderStatus.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchDate) {
        data = await searchOrdersByDate(searchDate);
      } else if (searchQuery) {
        data = await searchOrders(searchQuery);
      } else {
        data = await getOrders();
      }

      setOrders(data);
    } catch (error) {
      console.error('Error searching orders:', error);
      setError('Failed to search orders.');
    }
  };

  const handleDetails = (orderId) => {
    navigate(`/orderdetails/${orderId}`);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { header: 'Order ID', key: 'orderId' },
    { header: 'User ID', key: 'userId' },
    { header: 'Order Date', key: 'orderDate' },
    {
      header: 'Status',
      render: (order) => (
        <select
          className="form-select"
          value={statusChange[order.orderId] || order.orderStatus}
          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      ),
    },
    {
      header: 'Total Amount',
      render: (order) => `₹${order.totalAmount.toFixed(2)}`,
    },
  ];

  const actions = [
    {
      label: 'Save',
      variant: 'primary',
      onClick: (order) => handleSave(order.orderId),
    },
    {
      label: 'View',
      variant: 'primary',
      onClick: (order) => handleDetails(order.orderId),
    },
  ];

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
      <div
        className="container mt-3"
        style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}
      >
        <PageHeader title="Manage Orders" />
        <div className="row mb-3 align-items-center">
          <div className="col-md-4 d-flex flex-column justify-content-start ">
            <input
              type="date"
              id="searchDate"
              className="form-control"
              style={{ height: '48px' }}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <div className="col-md-8">
            <SearchBar
              placeholder="Search by order ID, user ID, or status"
              searchQuery={searchQuery}
              onInputChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
        <ErrorAlert message={error} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ReusableTable columns={columns} data={currentOrders} actions={actions} />
        )}
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
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

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdersPage;

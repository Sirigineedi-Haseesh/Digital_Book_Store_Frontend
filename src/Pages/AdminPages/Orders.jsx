import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus,searchOrdersByDate,searchOrders } from '../../Services/OrderService';
import SearchBar from '../../Components/SearchBar/SearchBar';
import ReusableTable from '../../Components/ReusableTable';
import ErrorAlert from '../../Components/ErrorAlert';
import PageHeader from '../../Components/PageHeader';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [error, setError] = useState(null);
  const [statusChange, setStatusChange] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [ordersPerPage] = useState(10); // Number of orders per page

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders.');
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
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status.');
    }
  };

  const handleSearch = async () => {
    try {
      let data = [];
  
      setError(null);
  
      if (searchDate && searchQuery) {
        // Step 1: Fetch orders by date first
        data = await searchOrdersByDate(searchDate);
        // Step 2: Filter by search query dynamically on the frontend
        data = data.filter(order =>
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
  

  // Pagination logic
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
      render: (order) => `₹${order.totalAmount.toFixed(2)}`, // Add rupee symbol and format to 2 decimal places
    },
  ];

  const actions = [
    {
      label: 'Save',
      variant: 'primary',
      onClick: (order) => handleSave(order.orderId),
    },
  ];

  return (
    <div
      className="container mt-10"
      style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}
    >
      <PageHeader title="Manage Orders" />
      
      {/* Search Section */}
      <div className="row mb-3 align-items-center">
        {/* Date Search */}
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

        {/* Search Bar */}
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
      <ReusableTable columns={columns} data={currentOrders} actions={actions} />
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
  );
};

export default OrdersPage;

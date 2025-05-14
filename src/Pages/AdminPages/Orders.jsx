import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState([
    { orderId: 101, customerName: "Alice", date: "2025-05-01", status: "Pending", totalPrice: 250 },
    { orderId: 102, customerName: "Bob", date: "2025-05-03", status: "Shipped", totalPrice: 180 },
    { orderId: 103, customerName: "Charlie", date: "2025-05-05", status: "Delivered", totalPrice: 320 },
  ]);
  const [statusChange, setStatusChange] = useState({});

  const handleSearch = () => {
    let filteredOrders = orders.filter(order => 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toString().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
    }

    setOrders(filteredOrders);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusChange(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const handleSave = (orderId) => {
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, status: statusChange[orderId] || order.status } : order
    ));
    alert(`Order #${orderId} status updated successfully!`);
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}>
      
      {/* Logo and Header */}
      <div className="text-start mb-4">
        <img src="logo.jpg" alt="Book Store" width="50" height="50"/>
        <label style={{ fontFamily: 'Times New Roman' }}>PageNest</label>
      </div>
      
      {/* Search Bar and Filters */}
      <div className="d-flex justify-content-between mb-3">
        <input 
          type="text" 
          className="form-control me-2" 
          placeholder="Search by order ID, customer name, or status" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input 
          type="date" 
          className="form-control me-2" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input 
          type="date" 
          className="form-control me-2" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {/* Order List Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER NAME</th>
            <th>ORDER DATE</th>
            <th>STATUS</th>
            <th>TOTAL PRICE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.date}</td>
              <td>
                <select 
                  className="form-select" 
                  value={statusChange[order.orderId] || order.status} 
                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td>${order.totalPrice}</td>
              <td>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => handleSave(order.orderId)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary">Previous</button>
        <button className="btn btn-secondary">Next</button>
      </div>
    </div>
  );
};

export default OrderList;

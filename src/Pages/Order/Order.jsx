import React, { useEffect, useState } from 'react';
import './Order.css';
import { getUser } from '../../Services/UserService';
import { getUserOrders } from '../../Services/OrderService';
import { getBookById } from '../../Services/BookService'; // Assuming this service exists

const Order = ({ onNewOrder }) => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('PENDING'); // Default status is 'PENDING'
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const [hasReloaded, setHasReloaded] = useState(false); // State to track if the page has reloaded

  const fetchOrders = async () => {
    try {
      // Clear previous error message
      setErrorMessage('');

      // Retrieve user data
      const username = localStorage.getItem('username');
      if (!username) {
        setErrorMessage('Username not found in localStorage.');
        return;
      }

      const user = await getUser(username);
      if (!user) {
        setErrorMessage('User not found.');
        return;
      }

      // Retrieve all orders for the user based on the selected status
      const userOrders = await getUserOrders(user.userId, status);
      if (!userOrders || userOrders.length === 0) {
        setOrders([]); // Clear orders if none are found
        setErrorMessage(`No ${status.toLowerCase()} orders found.`);
        return;
      }

      // Fetch book details for all orders
      const detailedOrders = await Promise.all(
        userOrders.map(async (order) => {
          const detailedBooks = await Promise.all(
            order.orderBooks.map(async (orderBook) => {
              const book = await getBookById(orderBook.bookId); // Fetch book details by bookId
              return {
                ...book,
                quantity: orderBook.quantity, // Add quantity from the order
              };
            })
          );
          return {
            ...order,
            books: detailedBooks, // Add detailed book information to the order
          };
        })
      );

      // Reverse the order of the detailedOrders array
      setOrders(detailedOrders.reverse());
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setErrorMessage('Orders Not Found. Please try again later.');
    }
  };

  useEffect(() => {
    fetchOrders(); // Call the async function whenever the status changes
  }, [status]);

  // Trigger fetchOrders when a new order is placed
  useEffect(() => {
    if (onNewOrder) {
      fetchOrders();
    }
  }, [onNewOrder]);

  // Function to calculate the estimated delivery date
  const calculateEstimatedDelivery = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10); // Add 10 days to the current date
    return currentDate.toLocaleDateString(); // Format the date as a readable string
  };

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
    <div className="order-container p-4 rounded shadow">
      <h2 className="mb-4">Your Orders</h2>

      {/* Buttons to filter orders by status */}
      <div className="mb-4">
        <button
          className={`btn btn-outline-primary me-2 ${status === 'PENDING' ? 'active' : ''}`}
          onClick={() => setStatus('PENDING')}
        >
          Pending Orders
        </button>
        <button
          className={`btn btn-outline-primary me-2 ${status === 'CANCELLED' ? 'active' : ''}`}
          onClick={() => setStatus('CANCELLED')}
        >
          Cancelled Orders
        </button>
        <button
          className={`btn btn-outline-primary me-2 ${status === 'SHIPPED' ? 'active' : ''}`}
          onClick={() => setStatus('SHIPPED')}
        >
          Shipped Orders
        </button>
        <button
          className={`btn btn-outline-primary ${status === 'DELIVERED' ? 'active' : ''}`}
          onClick={() => setStatus('DELIVERED')}
        >
          Delivered Orders
        </button>
      </div>

      {/* Display error message if no orders are found */}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {/* Display orders if available */}
      {orders.length > 0 && !errorMessage && (
        orders.map((order) => (
          <div key={order.orderId} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Order ID: {order.orderId}</h5>
              <p className="text-muted">Order Date: {order.orderDate}</p>
              <p className="text-muted">Total Amount: ₹{order.totalAmount}</p>

              <h6 className="mt-4">Books in this Order:</h6>
              {order.books.map((book, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                  <img
                    src={book.images} // Use the image URL from the book details
                    alt={book.title}
                    className="img-fluid rounded"
                    style={{ maxWidth: '100px' }}
                  />
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Product</span>
                      <span className="text-muted">{book.title}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Quantity</span>
                      <span className="text-muted">{book.quantity}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Price</span>
                      <span className="text-muted">₹{book.price}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Category</span>
                      <span className="text-muted">{book.category}</span>
                    </div>
                  </div>
                </div>
              ))}

              <h6 className="mt-4">Tracking Information:</h6>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Carrier</span>
                <span className="text-muted">USPS</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tracking Number</span>
                <span className="text-muted">234094567242423422898</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Status</span>
                <span className="text-muted">{order.orderStatus}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Estimated Delivery</span>
                <span className="text-muted">{calculateEstimatedDelivery()}</span>
              </div>
              <div className="d-flex justify-content-between mb-0">
                <span className="text-muted">Last Location</span>
                <span className="text-muted">Coimbatore , TamilNadu</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Order;
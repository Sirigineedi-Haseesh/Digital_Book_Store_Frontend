import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReusableTable from '../../Components/ReusableTable';
import { getOrderById } from '../../Services/OrderService'; // Assuming this service exists
import { getBookById } from '../../Services/BookService'; // Assuming this service exists

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [orderBooks, setOrderBooks] = useState([]); // Initialize orderBooks as an empty array
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setErrorMessage('');
        setLoading(true);

        // Fetch order details by orderId
        const orderDetails = await getOrderById(orderId);

        // Fetch book details for each bookId in the order
        const detailedBooks = await Promise.all(
          orderDetails.map(async (orderBook) => {
            const bookDetails = await getBookById(orderBook.bookId); // Fetch book details by bookId
            return {
              title: bookDetails.title,
              quantity: orderBook.quantity,
              price: bookDetails.price,
            };
          })
        );

        setOrderBooks(detailedBooks); // Set the detailed books
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        setErrorMessage('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  if (loading) {
    return <p>Loading order details...</p>; // Show a loading message while fetching data
  }

  const columns = [
    { header: 'Book Name', key: 'title' },
    { header: 'Quantity', key: 'quantity' },
    { header: 'Price', key: 'price' },
  ];

  return (
    <div className="order-details container-xl mt-4" style={{ width: '95vw ' }}>
      <h2 className="mb-4">Order Details</h2>
      <ReusableTable columns={columns} data={orderBooks} />
    </div>
  );
};

export default OrderDetails;
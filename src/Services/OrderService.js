import { api } from './api';

export const saveOrder = async (orderDetails) => {
  try {
    const response = await api.post('/create', orderDetails); // Adjust the endpoint as per your backend
    return response.data; // Return the saved order details
  } catch (error) {
    console.error('Error saving order:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const getUserOrders = async (userId,status) => {
  try {
    const response = await api.get(`http://localhost:9091/orders/userorders/${userId}/${status}`); // Adjust the endpoint as per your backend
    return response.data; // Return the fetched orders
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error; // Rethrow the error for further handling
  }
}

export const searchBooks = async (query) => {
  try {
    const response = await api.get(`http://localhost:9091/books/search/${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getOrders = async () => {
  try {
    const response = await api.get(`http://localhost:9091/admin/getOrders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.post(`http://localhost:9091/admin/changeStatus/${orderId}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchOrdersByDate = async (date) => {
  try {
    const response = await api.get(`http://localhost:9091/admin/date/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchOrdersByRange = async (startDate, endDate) => {
  try {
    const response = await api.get(`http://localhost:9091/admin/dateRange?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchOrders = async (query) => {
  try {
    const response = await api.get(`http://localhost:9091/admin/orders/search/${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`http://localhost:9091/order/${orderId}`);
    return response.data; // Return the fetched order details
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error; // Rethrow the error for further handling
  }
}
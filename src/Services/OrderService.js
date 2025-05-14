import { api } from './api';

export const saveOrder = async (orderDetails) => {
  try {
    const response = await api.post('/order/create', orderDetails); // Adjust the endpoint as per your backend
    return response.data; // Return the saved order details
  } catch (error) {
    console.error('Error saving order:', error);
    throw error; // Rethrow the error for further handling
  }
};
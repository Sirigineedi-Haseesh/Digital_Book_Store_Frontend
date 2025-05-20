
import { api } from './api';

//Instead of hardcoding the base URL in each function,can configure it once and reuse it.
const API_AUTH_URL = 'http://localhost:9096/api/auth';

//This asynchronous function takes userData as an argument and sends a POST request to the /saveUser endpoint.
//The function saveUser makes an API call to send this data to the backend (/api/auth/saveUser).
//The response object determines whether the operation succeeded or failed.
export const saveUser = async (userData) => {
  try {
    const response = await api.post(`/api/auth/saveUser`, userData);
    return response.data;
  }
   catch (error) {
    throw error;
  }
};

export const getUser = async (username) => {
  try {
    const response = await api.get(`/api/auth/profile/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/admin/allUsers');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authenticate = async (user) => {
  try {
    const response = await api.post(`${API_AUTH_URL}/login`, user);
    
    return response.data; //return jwt token
  } catch (error) {
    throw error; //server issue,login failed
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await api.delete(`/admin/deleteUser/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRole = async (username, role) => {
  try {
    const response = await api.post(`/admin/assignRole/${username}/${role}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const response = await api.get('/getAllBooks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const response = await api.post('/admin/save', book);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (username, userData) => {
  try {
    const response = await api.patch(`/user/update/${username}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

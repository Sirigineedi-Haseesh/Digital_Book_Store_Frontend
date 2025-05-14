import axios from 'axios';

const API_AUTH_URL = 'http://localhost:9096/api/auth';

export const saveUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:9091/api/auth/saveUser`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUser = async (username) => {
  try {
    const response = await axios.get(`http://localhost:9091/api/auth/profile/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:9091/admin/allUsers');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const authenticate = async (user) => {

  try {

    const response = await axios.post(`${API_AUTH_URL}/login`, user);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`http://localhost:9091/admin/deleteUser/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateUserRole = async (username, role) => {
  try {
    const response = await axios.post(`http://localhost:9091/admin/assignRole/${username}/${role}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const response = await axios.get('http://localhost:9091/getAllBooks');
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const addBook = async (book) => {
  try {
    const response = await axios.post('http://localhost:9091/admin/save', book);
    return response.data;
  } catch (error) {
    throw error;
  }
}

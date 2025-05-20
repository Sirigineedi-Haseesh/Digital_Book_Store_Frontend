import axios from 'axios';

// create an axios instance with a base URL
export const api = axios.create({
  baseURL: 'http://localhost:9091/',
});

// Add a request interceptor to include the JWT token in the headers
// This interceptor will be called before every request
// It checks if the JWT token is available in local storage and adds it to the request headers
// This is useful for authentication purposes
// If the token is not available, the request will still go through without the Authorization header
// This is useful for public endpoints where authentication is not required
// The interceptor returns the modified config object
// If there is an error in the request, it will be caught and returned as a rejected promise
// This is useful for handling errors globally
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('jwtToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);
export default api;
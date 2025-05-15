import { api } from './api';

export const addBook = async (book) => {
  try {
    const response = await api.post('http://localhost:9091/admin/save', book);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editBook = async (title, book) => {
  try {
    const response = await api.patch(`http://localhost:9091/admin/updateDetailsPatch/${title}`, book);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBook = async (title) => {
  try {
    const response = await api.delete(`http://localhost:9091/admin/delete/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookByTitle = async (title) => {
  try {
    const response = await api.get(`http://localhost:9091/books/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBooks = async () => {
  try {
    const response = await api.get('http://localhost:9091/getAllBooks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`http://localhost:9091/searchBook/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await api.get(`http://localhost:9091/books/search/${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
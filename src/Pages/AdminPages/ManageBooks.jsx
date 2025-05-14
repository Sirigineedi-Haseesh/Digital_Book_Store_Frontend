import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addBook, editBook, deleteBook } from '../services/BookService';
import { getBooks } from '../services/UserService';
const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (title) => {
    try {
      if (window.confirm(`Are you sure you want to delete book with title ${title}?`)) {
        await deleteBook(title);
        setBooks(books.filter(book => book.title !== title));
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = async (title) => {
    navigate('/editbook/' + title);
  };

  const handleCreateBook = () => {
    navigate('/addbooks');
  };

  return (
    <div className="container mt-10" style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}>
      <div className="text-start mb-4">
        <img src="logo.jpg" alt='Book Store' width="50" height="50"/>
        <label style={{ fontFamily: 'Times New Roman' }}>PageNest</label>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Books Page</h2>
        <Button variant="primary" onClick={handleCreateBook}>Add Book</Button>
      </div>
      <Table striped bordered hover>
        <thead className="thead-light">
          <tr>
            <th>Book Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Price</th>
            <th>Image</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.category}</td>
              <td>{book.authorName}</td>
              <td>{book.isbn}</td>
              <td>{book.price}</td>
              <td><img src={book.images} alt={book.title} style={{ width: '50px' }} /></td>
              <td>{book.inventory.stock}</td>
              <td>
                <Button variant="warning" className="mr-2" onClick={() => handleEdit(book.title)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(book.title)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BooksPage;

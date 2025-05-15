import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBook } from '../../Services/BookService';
import ErrorAlert from '../../Components/ErrorAlert';

const AddBookForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    category: '',
    price: '',
    authorName: '',
    images: '',
    stock: '',
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!formData.isbn || !formData.title || !formData.category || !formData.price || !formData.authorName || !formData.images || !formData.stock) {
      setErrorMessage("All fields are required!");
      setIsLoading(false);
      return;
    }

    // Validate price and stock
    if (formData.price <= 0) {
      setErrorMessage("Price must be a positive number!");
      setIsLoading(false);
      return;
    }

    if (formData.stock < 0) {
      setErrorMessage("Stock cannot be negative!");
      setIsLoading(false);
      return;
    }

    // Optional: Validate ISBN length
    if (formData.isbn.length !== 13) {
      setErrorMessage("ISBN must be 13 characters long!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await addBook({
        isbn: formData.isbn,
        title: formData.title,
        category: formData.category,
        price: formData.price,
        authorName: formData.authorName,
        images: formData.images,
        inventory: { stock: formData.stock },
      });

      if (response) {
        console.log("Book added successfully!", response);
        navigate('/managebooks'); // Redirect upon successful book addition
      }
    } catch (error) {
      console.error("Error saving book:", error);

      if (error.response && error.response.data) {
        setErrorMessage(typeof error.response.data === 'string' ? error.response.data : "An error occurred. Please try again.");
      } else {
        setErrorMessage("Failed to add book. Please try again.");
      }
    } finally {
      setIsLoading(false); // ✅ Stop loading after response
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body" style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
          
          {/* Book Store Logo & Label */}
          <div className="text-center mb-4">
            <img src="logo.jpg" alt="Book Store" width="50" height="50" />
            <label style={{ fontFamily: 'Times New Roman', fontSize: '20px', marginLeft: '10px' }}>
              PageNest
            </label>
          </div>

          {isLoading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          <ErrorAlert message={errorMessage} />

          {/* Form Heading */}
          <h2 className="text-center mb-4">ADD BOOK</h2>

          {/* Add Book Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input type="text" className="form-control" id="isbn" placeholder="Enter ISBN" value={formData.isbn} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" placeholder="Enter book title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input type="text" className="form-control" id="category" placeholder="Enter book category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" className="form-control" id="price" placeholder="Enter book price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="authorName" className="form-label">Author Name</label>
              <input type="text" className="form-control" id="authorName" placeholder="Enter author name" value={formData.authorName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="images" className="form-label">Image URL</label>
              <input type="text" className="form-control" id="images" placeholder="Enter image URL" value={formData.images} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="number" className="form-control" id="stock" placeholder="Enter stock quantity" value={formData.stock} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? "Submitting..." : "ADD BOOK"}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => {
                setFormData({
                  isbn: '',
                  title: '',
                  category: '',
                  price: '',
                  authorName: '',
                  images: '',
                  stock: '',
                });
                setErrorMessage('');
              }}
              disabled={isLoading}
            >
              RESET
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;

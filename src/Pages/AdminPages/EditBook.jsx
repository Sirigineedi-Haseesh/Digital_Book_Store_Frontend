import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBook, editBook, getBookByTitle } from '../services/BookService';

const AddBookForm = () => {
  const { title } = useParams();
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
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    if (title) {
      const fetchBook = async () => {
        try {
          const book = await getBookByTitle(title);
          setFormData({
            isbn: book.isbn,
            title: book.title,
            category: book.category,
            price: book.price,
            authorName: book.authorName,
            images: book.images,
            stock: book.inventory.stock,
          });
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [title]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    setFormData({
      ...formData,
      [id]: value,
    });

    // Store only changed fields
    setUpdatedFields({
      ...updatedFields,
      ...(id === "stock" ? { inventory: { stock: Number(value) } } : { [id]: value }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Submitting only changed fields:", updatedFields);

    if (updatedFields.price !== undefined && updatedFields.price <= 0) {
      setErrorMessage("Price must be a positive number!");
      setIsLoading(false);
      return;
    }

    if (updatedFields.stock !== undefined && updatedFields.stock < 0) {
      setErrorMessage("Stock cannot be negative!");
      setIsLoading(false);
      return;
    }

    try {
      if (title) {
        await editBook(title, updatedFields); // Send only modified fields
        console.log("Book updated successfully!");
      } else {
        await addBook(formData); // Send full data for new book
        console.log("Book added successfully!");
      }
      navigate('/managebooks');
    } catch (error) {
      console.error("Error saving book:", error);
      setErrorMessage(error.response?.data || "Failed to save book. Please try again.");
    } finally {
      setIsLoading(false);
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
          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}

          {/* Form Heading */}
          <h2 className="text-center mb-4">{title ? "EDIT BOOK" : "ADD BOOK"}</h2>

          {/* Add/Edit Book Form */}
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
              {isLoading ? "Submitting..." : title ? "UPDATE BOOK" : "ADD BOOK"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;

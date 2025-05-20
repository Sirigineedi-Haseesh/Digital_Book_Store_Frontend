import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';// Adjust the import path as necessary
import { getAllBooks } from '../../Services/BookService';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { searchBooks } from '../../Services/BookService'; // Adjust the import path as necessary
// Moved useCart hook outside the component

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // Correctly destructure useState
  const navigate = useNavigate();

  const chunkArray = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllBooks(); // Log the fetched products
        setProducts(response);
        const uniqueCategories = ['All', ...new Set(response.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (isbn) => {
    navigate(`/productview/${isbn}`); // Ensure the route matches the updated parameter
  };

  const handleCategoryClick = (category, event) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === '') {
        // If search query is empty, fetch all books
        const response = await getAllBooks();
        setProducts(response);
        setError(null); // Clear any previous error
      } else {
        // If search query is present, fetch filtered books
        const response = await searchBooks(searchQuery);
        setProducts(response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const cardColors = ['#f8d7da', '#d4edda', '#d1ecf1', '#fff3cd', '#f5c6cb', '#c3e6cb', '#bee5eb', '#ffeeba'];

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
    <div className="products container mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <SearchBar
          placeholder="Search for products..."
          searchQuery={searchQuery}
          onInputChange={(value) => setSearchQuery(value)} // Pass the function to update searchQuery
          onSearch={() => handleSearch()} // Optional: Trigger search on button click
        />
      <div className="category-buttons mb-4 text-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-outline-primary mx-2 ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={(event) => handleCategoryClick(category, event)}
          >
            {category}
          </button>
        ))}
      </div>
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          {chunkArray(filteredProducts, 3).map((row, rowIndex) => (
            <div className="row mb-4" key={rowIndex} style={{ marginBottom: '2vh', backgroundColor: '#f8f9fa' }}>
              {row.map((product, productIndex) => (
                <div
                  key={product.id}
                  className="col-md-3"
                  onClick={() => handleCardClick(product.isbn)} // Use `isbn` as the unique identifier
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="card"
                    style={{
                      width: '16rem',
                      backgroundColor: cardColors[(rowIndex * 4 + productIndex) % cardColors.length], // Cycle through colors
                    }}
                  >
                    <img
                      src={product.images}
                      className="card-img-top"
                      alt={product.title || 'Product image'}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">by {product.authorName}</h6>
                      <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
                        {product.isbn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Products;

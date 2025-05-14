import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 
import './products.css';

// Moved useCart hook outside the component
const useCart = () => {
  const context = useContext(CartContext); // Corrected to use CartContext
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartBadgeCount, setCartBadgeCount] = useState(0); // Correctly destructure useState
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const updateCartBadge = (count) => {
    setCartBadgeCount(count); // Update the cart badge count
  };

  const chunkArray = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/books.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        const uniqueCategories = ['All', ...new Set(data.map((product) => product.category))];
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

  const handleAddToCart = (product, event) => {
    event.stopPropagation();

    // Use the addToCart function from the CartContext
    addToCart(product);

    // Retrieve the updated cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update the cart badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartBadge(totalItems);
  };

  const handleCategoryClick = (category, event) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="products container mt-4">
      <h1 className="text-center mb-4">Products</h1>
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
          {chunkArray(filteredProducts, 4).map((row, rowIndex) => (
            <div className="row mb-4" key={rowIndex} style={{ marginBottom: '2vh' }}>
              {row.map((product) => (
                <div
                  key={product.id}
                  className="col-md-3"
                  onClick={() => handleCardClick(product.isbn)} // Use `isbn` as the unique identifier
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card" style={{ width: '16rem' }}>
                    <img
                      src={product.image || 'https://via.placeholder.com/120'}
                      className="card-img-top"
                      alt={product.title || 'Product image'}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">by {product.author}</h6>
                      <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
                        {product.description}
                      </p>
                      <button
                        className="btn btn-primary"
                        style={{ gap: '1vh', marginTop: '1vh' }}
                        onClick={(event) => handleAddToCart(product, event)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

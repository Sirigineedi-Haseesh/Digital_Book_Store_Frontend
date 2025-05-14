import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productView.css'; // Import a dedicated CSS file for styling

const ProductView = ({ updateCartBadge }) => { // Add `updateCartBadge` prop
  const { isbn } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookType, setBookType] = useState('Hardcover');
  const [error, setError] = useState(null);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/books.json');
        const books = await response.json();
        const selectedProduct = books.find((item) => item.isbn === isbn);
        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          setError('Product not found.');
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setError('Failed to load product details. Please try again later.');
      }
    };

    fetchProduct();
  }, [isbn]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.bookId,
      name: product.title,
      price: product.price,
      quantity,
      bookType,
    };

    // Retrieve existing cart from localStorage or initialize a new one
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id && item.bookType === cartItem.bookType);

    if (existingItemIndex > -1) {
      // Update quantity if the item already exists in the cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart badge value
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartBadge(totalItems);

    console.log('Added to cart:', cartItem);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="product-view container mt-4">
      <h1 className="product-title text-center mb-4">{product.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.title}
            className="product-image img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <p><b>Author:</b> {product.author}</p>
            <p><b>Description:</b> {product.description}</p>
            <p><b>Price:</b> <span className="price">${product.price}</span></p>
          </div>
    
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="bookType" className="form-label"><b>Book Type:</b></label>
              <select
                id="bookType"
                className="form-select shadow-sm"
                value={bookType}
                onChange={(e) => setBookType(e.target.value)}
              >
                <option value="Hardcover">Hardcover</option>
                <option value="Paperback">Paperback</option>
                <option value="Ebook">Ebook</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="quantity" className="form-label"><b>Quantity:</b></label>
              <div className="quantity-control d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="form-control shadow-sm text-center mx-2"
                  min="1"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg shadow-sm" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

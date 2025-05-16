import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productView.css'; // Import a dedicated CSS file for styling
import { getAllBooks } from '../../Services/BookService'; 
import ReviewAndRating from '../ReviewAndRating';
import { getUser } from '../../Services/UserService'; // Import the getUser function

const ProductView = ({ updateCartBadge }) => { // Add `updateCartBadge` prop
  const { isbn } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookType, setBookType] = useState('Hardcover');
  const [error, setError] = useState(null);
  const [userId,setUserId] = useState(null); // State to store userId

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const fetchUserId = async () => {
    console.log("Inside fetchUserId");
    try {
      const response = await getUser(localStorage.getItem('username'));
      console.log(response.userId);
      setUserId(response.userId); // Set the userId in state
      console.log(userId);
       // Set the userId in state
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllBooks();
        const selectedProduct = response.find((item) => item.isbn === isbn);
        if (selectedProduct) {
          setProduct({
            ...selectedProduct,
            bookId: selectedProduct.inventory?.book?.bookId, // Safely access bookId
          });
        } else {
          setError('Product not found.');
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setError('Failed to load product details. Please try again later.');
      }
    };

    fetchProduct();
    console.log("fetching userId");
    fetchUserId(); // Fetch the userId when the component mounts
  }, [isbn]);
  useEffect(() => {
    console.log('Updated userId:', userId);
  }, [userId]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.bookId,
      name: product.title,
      price: product.price,
      image: product.images,
      isbn: product.isbn,
      category: product.category,
      quantity,
    };

    // Retrieve existing cart from localStorage or initialize a new one
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id && item.isbn === cartItem.isbn);

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
    console.log('Quantity:', quantity);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
    <div className="product-view container mt-4">
      <h1 className="product-title text-center mb-4">{product.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.images}
            alt={product.title}
            className="product-image img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <p><b>Author:</b> {product.authorName}</p>
            <p><b>ISBN:</b> {product.isbn}</p>
            <p><b>Price:</b> <span className="price">₹{product.price}</span></p>
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
                  style={{ color: 'black', width: '5vw' }} // Use valid inline styles
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
      <ReviewAndRating
        bookId={product.bookId}
        bookTitle={product.title}
        userId={userId} // Pass the userId to ReviewAndRating
      />
    </div>
    </div>
  );
};

export default ProductView;

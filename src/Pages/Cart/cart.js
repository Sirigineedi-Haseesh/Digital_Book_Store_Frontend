import React, { useContext, useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Snackbar, Alert } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { saveOrder } from '../../Services/OrderService'; 
import { getUser } from '../../Services/UserService'; 


const Cart = ({ updateCartBadge }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(user.cart || []); // Use cart from UserContext
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    setCartItems(cart.map(item => ({ ...item, bookId: item.bookId || item.id }))); // Ensure bookId is used
  }, []);

  const handleQuantityChange = (bookId, bookType, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.bookId === bookId && item.bookType === bookType
        ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update cart badge
    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartBadge(totalItems);
  };

  const handleRemoveItem = (bookId, bookType) => {
    const updatedCart = cartItems.filter((item) => !(item.bookId === bookId && item.bookType === bookType));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update cart badge
    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartBadge(totalItems);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromoCode = () => {
    let discountAmount = 0;
    if (promoCode === 'NEWDEAL') {
      discountAmount = 10; // Example discount for new customers
    } else if (promoCode === 'FLAT10' && subtotal > 500) {
      discountAmount = 10; // Flat 10% discount for orders over ₹500
    } else if (promoCode === 'FLAT30' && subtotal > 2000) {
      discountAmount = 30; // Flat 30% discount for orders over ₹2000
    }
    setDiscount(discountAmount);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  

  const createOrder = async () => {
    let user = await getUser(localStorage.getItem('username'));
    try {
      const orderDetails = {
        userId: user.userId, // Assuming `user` is available from UserContext
        orderDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        totalAmount: discountedTotal, // Use the discounted total amount
        orderBooks: cartItems.map((item) => ({
          bookId: item.bookId, // Use bookId from books.json
          quantity: item.quantity,
          price: item.price,
        })), // Map cart items to orderBooks
        orderStatus: 'PENDING', // Default order status
      };
      console.log(orderDetails); // Log order details for debugging
      const savedOrder = await saveOrder(orderDetails); // Call the saveOrder function
      console.log('Order saved successfully:', savedOrder);

      // Clear the cart after saving the order
      setCartItems([]);
      localStorage.removeItem('cart');
      updateCartBadge(0);

      // Navigate to the order confirmation page
      navigate('/order');
    } catch (error) {
      console.error('Failed to save order:', error);
      alert('Failed to save the order. Please try again.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0.00;
  const tax = subtotal * 0.05; 
  const total = subtotal + shipping + tax;
  const discountedTotal = total - discount;

  return (
    <div className="container">
      <h4 className="" >Your Shopping Cart</h4>
      <div className="row">
        <div className="col-lg-8">
          {/* Cart Items */}
          <div className="card mb-4" style={{ borderRadius: '0', boxShadow: 'none' }}>
            <div className="card-body">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map(item => (
                  <div className="row cart-item mb-3" key={`${item.bookId}-${item.bookType}`}>
                    <div className="col-md-3">
                      <img src={item.image} alt={item.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-5">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="text-muted">Category: {item.category}</p>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => handleQuantityChange(item.bookId, item.bookType, item.quantity - 1)}>-</button>
                        <input style={{ maxWidth: '100px' }} type="text" className="form-control form-control-sm text-center quantity-input" value={item.quantity} readOnly />
                        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => handleQuantityChange(item.bookId, item.bookType, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveItem(item.bookId, item.bookType)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Continue Shopping Button */}
          <div className="text-start mb-4">
            <Link to="/" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          {/* Cart Summary */}
          <div className="card cart-summary" style={{ borderRadius: '0', boxShadow: 'none' }}>
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                {discount > 0 ? (
                  <div>
                    <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>₹{total.toFixed(2)}</span>
                    <strong>₹{discountedTotal.toFixed(2)}</strong>
                  </div>
                ) : (
                  <strong>₹{total.toFixed(2)}</strong>
                )}
              </div>
              <Button className="address-btn" onClick={createOrder}component={Link} to="/order">Proceed to Checkout</Button>
              <div className="flex mt-4">
                <label htmlFor="promoCode" className="form-label">Promo Code:</label>
                <input
                  type="text"
                  className="form-control"
                  id="promoCode"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                />
                <button className="btn btn-primary mt-4" onClick={handleApplyPromoCode}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={showPopup} autoHideDuration={6000} onClose={handleClosePopup}>
        <Alert onClose={handleClosePopup} severity="success" sx={{ width: '100%' }}>
          Promo code applied successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;

import React from 'react';
 import './Order.css';

 const Order = () => {
  return (
    <div className="order-container p-4 rounded shadow">
      <div className="invoice-header d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">INVOICE <span className="text-primary font-weight-bold">#Y34XDHR</span></h5>
        <div className="text-end">
          <p className="mb-0">Expected Arrival <span className="text-muted">01/12/19</span></p>
          <p className="mb-0">USPS <span className="font-weight-bold text-muted">234094567242423422898</span></p>
        </div>
      </div>

      <ul id="progressbar-2" className="progressbar d-flex justify-content-between mx-0 mt-0 mb-3 px-0 pt-0 pb-2">
        <li className="step0 active text-center"></li>
        <li className="step0 active text-center"></li>
        <li className="step0 active text-center"></li>
        <li className="step0 text-end"></li>
      </ul>

      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row gap-4">
          <div className="d-flex align-items-center">
            <i className="fas fa-clipboard-list fa-2x me-2 mb-0"></i>
            <div>
              <p className="fw-bold mb-1">Order</p>
              <p className="fw-bold mb-0 text-muted">Processed</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <i className="fas fa-box-open fa-2x me-2 mb-0"></i>
            <div>
              <p className="fw-bold mb-1">Order</p>
              <p className="fw-bold mb-0 text-muted">Shipped</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <i className="fas fa-shipping-fast fa-2x me-2 mb-0"></i>
            <div>
              <p className="fw-bold mb-1">Order</p>
              <p className="fw-bold mb-0 text-muted">En Route</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <i className="fas fa-home fa-2x me-2 mb-0"></i>
            <div>
              <p className="fw-bold mb-1">Order</p>
              <p className="fw-bold mb-0 text-muted">Arrived</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Order Details</h5>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <img src="/book1.png" alt="Product" className="img-fluid rounded" style={{ maxWidth: '100px' }} />
            <div className="flex-grow-1 ms-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Product</span>
                <span className="text-muted">Awesome Widget</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Quantity</span>
                <span className="text-muted">2</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Price</span>
                <span className="text-muted">$50.00</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Description</span>
                <span className="text-muted">A high-quality widget for all your needs.</span>
              </div>
              <div className="d-flex justify-content-between mb-0">
                <span className="text-muted">Order Date</span>
                <span className="text-muted">01/01/19</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title mb-4">Tracking Information</h5>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Carrier</span>
            <span className="text-muted">USPS</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Tracking Number</span>
            <span className="text-muted">234094567242423422898</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Status</span>
            <span className="text-muted">In Transit</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Estimated Delivery</span>
            <span className="text-muted">01/12/19</span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="text-muted">Last Location</span>
            <span className="text-muted">New York, NY</span>
          </div>
        </div>
      </div>
    </div>
  );
 };

 export default Order;
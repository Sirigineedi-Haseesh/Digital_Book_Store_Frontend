import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Pages/ReviewAndRating.css"; // Ensure styles are importedx
// 🌟 Alert Message Component
const AlertBox = ({ message }) => {
    return (
        <div className="alert-box">
            <p>{message}</p>
        </div>
    );
};

export default AlertBox;
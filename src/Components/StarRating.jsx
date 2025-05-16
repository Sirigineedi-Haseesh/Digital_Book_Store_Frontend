import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Pages/ReviewAndRating.css"// Ensure styles are imported

const StarRating = ({ rating, setRating, readOnly = false }) => {
    const handleClick = (index) => {
        if (!readOnly && setRating) {
            setRating(index + 1);
        }
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleClick(index)}
                    style={{
                        cursor: readOnly ? "default" : "pointer",
                        color: index < rating ? "gold" : "gray",
                        fontSize: "1.5rem",
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
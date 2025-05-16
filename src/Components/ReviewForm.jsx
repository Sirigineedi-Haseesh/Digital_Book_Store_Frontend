import React, { useState } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ addReview }) => {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        addReview(reviewText, rating);
        setReviewText("");
        setRating(0);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
                <label htmlFor="reviewText">Review:</label>
                <textarea
                    id="reviewText"
                    className="form-control"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Rating:</label>
                <StarRating rating={rating} setRating={setRating} />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
                Submit
            </button>
        </form>
    );
};

export default ReviewForm;
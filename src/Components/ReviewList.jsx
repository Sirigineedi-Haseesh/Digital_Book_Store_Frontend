import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { getReviewsByBookTitle, deleteReviewOfUser, updateReviewOfUser } from "../Services/ReviewAndRatingService";

const ReviewList = ({ bookTitle,userId }) => {
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(null); // Track which review is being edited
    const [updatedText, setUpdatedText] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);
     // Replace with dynamic user ID from authentication if available

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await getReviewsByBookTitle(bookTitle);
                setReviews(fetchedReviews);
                console.log(fetchedReviews);
                console.log(reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [bookTitle]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Extract only the date part
    };

    const deleteReview = async (reviewId) => {
        try {
            await deleteReviewOfUser(reviewId);
            setReviews(reviews.filter((review) => review.reviewId !== reviewId));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const saveUpdatedReview = async (reviewId) => {
        const reviewToUpdate = reviews.find((review) => review.reviewId === reviewId);

        const updatedReview = {
            ...reviewToUpdate,
            review: updatedText,
            rating: updatedRating,
        };

        try {
            const response = await updateReviewOfUser(updatedReview); // Call the API to update the review
            setReviews(
                reviews.map((review) =>
                    review.reviewId === reviewId ? { ...review, ...response } : review
                )
            );
            setEditMode(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Reviews for "{bookTitle}"</h2>
            {reviews.length === 0 ? (
                <p className="text-center text-muted">No reviews available for "{bookTitle}".</p>
            ) : (
                <div className="row">
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="col-md-6 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Review ID: {review.reviewId}</h5>
                                    {editMode === review.reviewId ? (
                                        <>
                                            <textarea
                                                className="form-control mb-2"
                                                value={updatedText}
                                                onChange={(e) => setUpdatedText(e.target.value)}
                                            />
                                            <StarRating
                                                rating={updatedRating}
                                                setRating={setUpdatedRating}
                                            />
                                            <button
                                                className="btn btn-success btn-sm mt-2"
                                                onClick={() => saveUpdatedReview(review.reviewId)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm mt-2"
                                                onClick={() => setEditMode(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="card-text"><strong>Review:</strong> {review.review}</p>
                                            <div className="mb-2">
                                                <strong>Rating:</strong> <StarRating rating={review.rating} readOnly />
                                            </div>
                                            <p className="card-text"><strong>Date:</strong> {formatDate(review.date)}</p>
                                            <p className="card-text"><strong>Book Title:</strong> {bookTitle}</p>
                                            <p className="card-text"><strong>User ID:</strong> {review.userId}</p>
                                            {review.userId === userId && ( // Show buttons only for the logged-in user's reviews
                                                <div className="d-flex justify-content-between">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => deleteReview(review.reviewId)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => {
                                                            setEditMode(review.reviewId);
                                                            setUpdatedText(review.review);
                                                            setUpdatedRating(review.rating);
                                                        }}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;
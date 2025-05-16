import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReviewAndRating.css"; // Import your CSS file here
import AlertBox from "../Components/AlertBox";
import ReviewForm from "../Components/ReviewForm";
import ReviewList from "../Components/ReviewList";
import { addReviewOfUser } from "../Services/ReviewAndRatingService";

const ReviewAndRating = (props) => {
    const [reviews, setReviews] = useState({
        rating: 0,
        review: "",
        date: "",
        bookTitle: props.bookTitle,
        bookId: props.bookId,
        userId: props.userId,
    });
    const [alertMessage, setAlertMessage] = useState("");

    // Show alert message
    const showAlert = (message) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(""), 3000);
    };

    // Add a new review
    const addReview = async (reviewText, rating) => {
        if (reviewText.length === 0 || rating === 0) {
            showAlert("❌ Please provide both a review and a rating, and rating cannot be 0!");
            return;
        }

        const formatDate = (date) => {
            const pad = (num, size) => num.toString().padStart(size, "0");
            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1, 2);
            const day = pad(date.getDate(), 2);
            const hours = pad(date.getHours(), 2);
            const minutes = pad(date.getMinutes(), 2);
            const seconds = pad(date.getSeconds(), 2);
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; // Add 'T' separator
        };

        const newReview = {
            review: reviewText,
            rating,
            date: formatDate(new Date()),
            bookTitle: reviews.bookTitle,
            bookId: reviews.bookId,
            userId: reviews.userId,
        };
        setReviews(newReview); // Update the state with the new review
        console.log("New review object:", newReview); // Log the new review object
        try {
            await addReviewOfUser(newReview); // Send the sanitized object to the server
            showAlert("✅ Thank you! Your review has been submitted.");
            window.location.reload(); // Reload the page after successful submission
        } catch (error) {
            console.error("Error submitting review:", error);
            showAlert("❌ Failed to submit your review. Please try again.");
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="text-center mt-4">📚 Reviews & Ratings</h1>
                {alertMessage && <AlertBox message={alertMessage} />}
                <ReviewForm addReview={addReview} />
                <ReviewList bookTitle={props.bookTitle} userId={props.userId} />
            </div>
        </>
    );
};

export default ReviewAndRating;

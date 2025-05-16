import {api} from './api';

export const addReviewOfUser = async (review)=>{
    try{
        const response = await api.post('/reviews-and-ratings/user/addReviewRating', review);
        return response.data;
    }catch(error){
        console.error("Error adding review:", error);
        throw error;
    }
}

export const getReviewsByBookTitle = async (bookTitle) => {
    try {
        const response = await api.get(`/reviews-and-ratings/book/${bookTitle}`);
        if (response.status !== 200) {
            throw new Error(`Error fetching reviews: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews by book title:", error);
        throw error;
    }
};

export const deleteReviewOfUser = async (reviewId) => {
    try {
        const response = await api.delete(`/reviews-and-ratings/user/deleteRating/${reviewId}`);
        if (response.status !== 200) {
            throw new Error(`Error deleting review: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting review:", error);
        throw error;
    }
};

export const updateReviewOfUser = async (updatedReview) => {
    try {
        const response = await api.put(`/reviews-and-ratings/user/updateReview`, updatedReview);
        if (response.status !== 200) {
            throw new Error(`Error updating review: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error updating review:", error);
        throw error;
    }
}
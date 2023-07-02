package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Review;

public interface ReviewDao {
    
    List<Review> selectAllReviews();
    Optional<Review> selectReviewByReviewId(String reviewId);
    int updateReview(Review review);
    int deleteReviewByReviewId(String reviewId);
    int insertReview(String reviewId, Review review); 
    boolean authenticateReview(String email, String password);
}

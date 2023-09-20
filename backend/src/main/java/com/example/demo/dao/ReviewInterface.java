package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Review;

public interface ReviewInterface {

    List<Review> selectAllReviews();

    Review getReviewById(String reviewId); // Change the method name

    List<Review> getReviewsByListing(String listingId); // Keep the method name

    int deleteReview(String reviewId); // Change the method name

    int updateReview(Review review);

    int insertReview(Review review);

    boolean authenticateReview(String email, String password);

    int deleteReviewByReviewId(String reviewId);

    Optional<Review> selectReviewByReviewId(String reviewId);
}

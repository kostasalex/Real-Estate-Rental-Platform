package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Review;

public interface ReviewInterface {

    List<Review> selectAllReviews();

    Review getReviewById(String reviewId); 

    List<Review> getReviewsByListing(String listingId);

    int deleteReview(String reviewId);

    int deleteReviewByListingId(Integer listingId);

    int updateReview(Review review);

    int insertReview(Review review);

    boolean authenticateReview(String email, String password);

    Optional<Review> selectReviewByReviewId(String reviewId);

    Optional<Review> selectReviewByListingId(Integer Id);
}

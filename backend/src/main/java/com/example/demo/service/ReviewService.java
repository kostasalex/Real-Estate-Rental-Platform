package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dao.ReviewInterface;
import com.example.demo.model.Review;

@Service
public class ReviewService {

    private ReviewInterface reviewDao;

    public ReviewService(ReviewInterface reviewDao) {
        this.reviewDao = reviewDao;
    }

    public List<Review> getAllReviews() {
        return reviewDao.selectAllReviews();
    }

    public Optional<Review> getReview(String reviewId) {
        return reviewDao.selectReviewByReviewId(reviewId);
    }

    public Optional<Review> getReviewListing(Integer Id) {
        return reviewDao.selectReviewByListingId(Id);
    }

    public int updateReview(Review review) {
        Optional<Review> optionalReview = getReview(review.getId());
        if (optionalReview.isPresent()) {
            reviewDao.updateReview(review);
            return 1;
        }
        return -1;
    }

    public int removeReview(String reviewId) {
        Optional<Review> optionalReview = getReview(reviewId);
        if (optionalReview.isPresent()) {
            reviewDao.deleteReview(reviewId);
            return 1;
        }
        return -1;
    }

        public int removeReviewListing(Integer Id) {
        Optional<Review> optionalReview = getReviewListing(Id);
        if (optionalReview.isPresent()) {
            reviewDao.deleteReviewByListingId(Id);
            return 1;
        }
        return -1;
    }

    public int insertReview(Review review) {
        return reviewDao.insertReview(review);
    }
}

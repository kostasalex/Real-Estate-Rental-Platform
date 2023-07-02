package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dao.ReviewDao;
import com.example.demo.model.Review;

@Service
public class ReviewService {

    private ReviewDao reviewDao;

    public ReviewService(ReviewDao reviewDao) {
        this.reviewDao = reviewDao;
    }

    public List<Review> getAllReviews() {
        return reviewDao.selectAllReviews();
    }

    public Optional<Review> getReview(String reviewId) {
        return reviewDao.selectReviewByReviewId(reviewId);
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
            reviewDao.deleteReviewByReviewId(reviewId);
            return 1;
        }
        return -1;
    }

    public int insertReview(Review review) {
        return reviewDao.insertReview(review.getId(), review);
    }
}

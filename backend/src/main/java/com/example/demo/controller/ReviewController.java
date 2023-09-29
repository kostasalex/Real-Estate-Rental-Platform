package com.example.demo.controller;

import com.example.demo.dao.ReviewInterface;
import com.example.demo.model.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:8443", maxAge = 3600)
public class ReviewController {

    private final ReviewInterface reviewDao;

    public ReviewController(ReviewInterface reviewDao) {
        this.reviewDao = reviewDao;
    }

    @PostMapping("/reviews")
    public ResponseEntity<String> postReview(@RequestBody Review review) {
        int rowsAffected = reviewDao.insertReview(review);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Review posted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to post review");
        }
    }

    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> getReview(@PathVariable("reviewId") String reviewId) {
        Review review = reviewDao.getReviewById(reviewId);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/reviews/listing/{listingId}")
    public ResponseEntity<List<Review>> getReviewsByListing(@PathVariable("listingId") String listingId) {
        List<Review> reviews = reviewDao.getReviewsByListing(listingId);
        return ResponseEntity.ok(reviews);
    }


    @RequestMapping(method = RequestMethod.DELETE, path = "/api/v1/deleteReview/{Id}")
    public ResponseEntity<String> deleteReview(@PathVariable("Id") String Id) {
        int result = reviewDao.deleteReview(Id);
        if (result > 0) {
            return ResponseEntity.ok("Review deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting review.");
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/v1/deleteReviewByListingId/{listingId}")
    public ResponseEntity<String> deleteReviewByListingId(@PathVariable("listingId") Integer listingId) {
        int result = reviewDao.deleteReviewByListingId(listingId);
        if (result > 0) {
            return ResponseEntity.ok("Review deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting review.");
        }
    }
}

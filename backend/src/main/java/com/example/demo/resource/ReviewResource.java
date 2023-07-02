package com.example.demo.resource;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Review;
import com.example.demo.service.ReviewService;

@RestController
@RequestMapping(path = "api/v1/reviews")
public class ReviewResource {

    private ReviewService reviewService;

    public ReviewResource(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Review> fetchReviews() {
        return reviewService.getAllReviews();
    }

    @RequestMapping(method = RequestMethod.GET, path = "{reviewId}")
    public Review fetchReview(@PathVariable("reviewId") String reviewId) {
        return reviewService.getReview(reviewId).orElse(null);
    }

}

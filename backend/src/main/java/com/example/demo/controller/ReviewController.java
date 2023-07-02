package com.example.demo.controller;

import com.example.demo.dao.ReviewDao;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewDao reviewDao;

    public ReviewController(ReviewDao reviewDao) {
        this.reviewDao = reviewDao;
    }
}

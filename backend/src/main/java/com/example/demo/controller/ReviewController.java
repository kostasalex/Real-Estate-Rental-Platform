package com.example.demo.controller;

import com.example.demo.dao.ReviewInterface;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewInterface reviewDao;

    public ReviewController(ReviewInterface reviewDao) {
        this.reviewDao = reviewDao;
    }
}

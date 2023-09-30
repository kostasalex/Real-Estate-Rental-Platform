package com.example.demo.controller;

import com.example.demo.dao.RecommendationInterface;
import com.example.demo.model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "https://localhost:8443")
public class RecommendationController {

    @Autowired
    private RecommendationInterface recommendationDao; // Recommendation DAO autowired

    @PostMapping("/getRecommendationsForGuest")
    public ResponseEntity<List<Card>> getRecommendationsForGuests(@RequestBody Map<String, List<Integer>> request) {
        List<Integer> ids = request.get("ids");
        return ResponseEntity.ok(recommendationDao.getListingsByGuest(ids));
    }

    @PostMapping("/getRecommendationsForUser")
    public ResponseEntity<List<Card>> getRecommendationsForUser(@RequestParam int userId) {
        return ResponseEntity.ok(recommendationDao.getListingsByUser(userId));
    }
}

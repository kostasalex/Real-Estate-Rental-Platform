package com.example.demo.controller;

import com.example.demo.dao.CardInterface;
import com.example.demo.model.Card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CardController {

    private final CardInterface cardDao;

    public CardController(CardInterface cardDao) {
        this.cardDao = cardDao;
    }

    @PostMapping("/api/v1/search")
    public ResponseEntity<List<Card>> searchCards(@RequestBody String filters) {

        List<Card> searchResults = cardDao.searchCards(filters);
        return ResponseEntity.ok(searchResults);
    }

    @PostMapping("/api/v1/insertCard")
    public ResponseEntity<Map<String, Object>> insertCard(@RequestBody Card card) {
        // Check if the user already exists
        if (cardDao.selectCardByCardId(card.getId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Card already registered. Please use a different card."));
        }


        // Save the user to the database
        int newCardId = cardDao.insertCard(card);
        if (newCardId > 0) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Card registered successfully");
            response.put("id", newCardId);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // @PostMapping("/api/v1/cards")
    // public ResponseEntity<Map<String, Object>> insertCard(@RequestBody Card card) {
    //     // Generate a unique card ID or use any logic you prefer
    //     String cardId = UUID.randomUUID().toString();

    //     int rowsAffected = cardDao.insertCard(cardId, card);

    //     if (rowsAffected > 0) {
    //         // Card inserted successfully
    //         card.setId(cardId);
    //         Map<String, Object> response = new HashMap<>();
    //         response.put("message", "Card inserted successfully");
    //         response.put("card", card);
    //         return ResponseEntity.ok(response);
    //     } else {
    //         // Failed to insert card
    //         Map<String, Object> response = new HashMap<>();
    //         response.put("message", "Failed to insert card");
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    //     }
    // }
}

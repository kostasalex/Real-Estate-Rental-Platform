package com.example.demo.controller;

import com.example.demo.dao.CardInterface;
import com.example.demo.model.Card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "https://localhost:8443")
public class CardController {

    private final CardInterface cardDao;

    public CardController(CardInterface cardDao) {
        this.cardDao = cardDao;
    }

    @PostMapping("/search")
    public ResponseEntity<List<Card>> searchCards(@RequestBody String filters) {

        List<Card> searchResults = cardDao.searchCards(filters);
        return ResponseEntity.ok(searchResults);
    }

    @PostMapping("/insertCard")
    public ResponseEntity<Map<String, Object>> insertCard(@RequestBody Card card) {

        // System.out.println(card.toString());
        if (cardDao.selectCardByCardId(card.getId()).isPresent()) {

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Card already registered. Please use a different card."));
        }

        int newCardId = cardDao.insertCardImp(card);
        if (newCardId > 0) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Card registered successfully");
            response.put("id", newCardId);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}

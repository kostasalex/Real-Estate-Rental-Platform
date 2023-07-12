package com.example.demo.controller;

import com.example.demo.dao.CardInterface;
import com.example.demo.model.Card;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}

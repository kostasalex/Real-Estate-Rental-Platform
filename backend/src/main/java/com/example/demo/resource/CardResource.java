package com.example.demo.resource;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Card;
import com.example.demo.service.CardService;

@RestController
@RequestMapping(path = "api/v1/cards")

public class CardResource {

    private CardService cardService;

    public CardResource(CardService cardService) {
        this.cardService = cardService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Card> fetchCards() {
        return cardService.getAllCards();
    }

    @RequestMapping(method = RequestMethod.GET, path = "{cardId}")
    public Card fetchCard(@PathVariable("cardId") String cardId) {
        return cardService.getCard(cardId).orElse(null);
    }

}

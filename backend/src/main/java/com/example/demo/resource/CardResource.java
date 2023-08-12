package com.example.demo.resource;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.CardInterface;
import com.example.demo.model.Card;

@RestController
@RequestMapping(path = "api/v1/cards")
public class CardResource {

    private CardInterface cardInterface;

    public CardResource(CardInterface cardInterface) {
        this.cardInterface = cardInterface;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Card> fetchCards() {
        return cardInterface.selectAllCards();
    }

    @RequestMapping(method = RequestMethod.GET, path = "{cardId}")
    public Card fetchCard(@PathVariable("cardId") String cardId) {
        return cardInterface.selectCardByCardId(cardId).orElse(null);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/countries")
    public List<String> getCountries() {
        return cardInterface.getDistinctCountries();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/cities")
    public List<String> getCities() {
        return cardInterface.getDistinctCities();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/streets")
    public List<String> getStreets() {
        return cardInterface.getDistinctStreets();
    }
}

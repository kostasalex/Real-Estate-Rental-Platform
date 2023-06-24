package com.example.demo.service;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;

import com.example.demo.dao.CardDao;
import com.example.demo.model.Card;

@Service
public class CardService {

    private CardDao cardDao;

    
    public CardService(CardDao cardDao) {
        this.cardDao = cardDao;
    }

    public List<Card> getAllCards() {
        return cardDao.selectAllCards();
    }

    public Optional<Card> getCard(String cardId) {
        return cardDao.selectCardByCardId(cardId);

    }

    public int updateCard(Card card) {
        Optional<Card> optinalCard = getCard(card.getId());
        if (optinalCard.isPresent()) {
            cardDao.updateCard(card);
            return 1; 
        }
        return -1;
    }

    public int removeCard(String cardId) {
        Optional<Card> optinalCard = getCard(cardId);
        if (optinalCard.isPresent()) {
            cardDao.deleteCardByCardId(cardId);
            return 1;
        }
        return -1;
    }

    public int insertCard(Card card) {
        return cardDao.insertCard("okoko", card);
    }
}

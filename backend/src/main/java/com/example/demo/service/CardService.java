package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


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

    public Optional<Card> getCard(UUID cardUid) {
        return cardDao.selectCardByCardUid(cardUid);

    }

    public int updateCard(Card card) {
        Optional<Card> optinalCard = getCard(card.getCardUid());
        if (optinalCard.isPresent()) {
            cardDao.updateCard(card);
            return 1;
        }
        return -1;
    }

    public int removeCard(UUID cardUid) {
        Optional<Card> optinalCard = getCard(cardUid);
        if (optinalCard.isPresent()) {
            cardDao.deleteCardByCardUid(cardUid);
            return 1;
        }
        return -1;
    }

    public int insertCard(Card card) {
        UUID uuid = UUID.randomUUID();
        return cardDao.insertCard(uuid, card);
    }
}

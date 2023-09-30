package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BookingImpl;
import com.example.demo.dao.CardInterface;
import com.example.demo.model.Card;

@Service
public class CardService {

    private CardInterface cardDao;
    private BookingImpl bookingDao;

    public CardService(CardInterface cardDao) {
        this.cardDao = cardDao;
    }

    public List<Card> getAllCards(Optional<String> hosts_id) {
        List<Card> cards = cardDao.selectAllCards();

        if (hosts_id.isPresent() && !hosts_id.get().isEmpty()) {
            return cards.stream()
                    .filter(card -> hosts_id.get().equals(card.gethosts_id()))
                    .collect(Collectors.toList());
        }

        return cards;
    }

    public Optional<Card> getCard(String cardId) {
        return cardDao.selectCardByCardId(cardId);

    }

    public int updateCard(Card card) {
        Optional<Card> optionalCard = getCard(card.getId());
        if (optionalCard.isPresent()) {
            cardDao.updateCard(card);
            return 1;
        }
        return -1;
    }

    public int removeCard(String cardId) {
        Optional<Card> optionalCard = getCard(cardId);
        if (optionalCard.isPresent()) {
            cardDao.deleteCardByCardId(cardId);
            return 1;
        }
        return -1;
    }

    public int removeUserCard(String cardId) {
        Optional<Card> optionalCard = getCard(cardId);
        if (optionalCard.isPresent()) {
            cardDao.getListingsByUserId(cardId);
            return 1;
        }
        return -1;
    }

    public int insertCard(Card card) {
        return cardDao.insertCardImp(card);
    }

}

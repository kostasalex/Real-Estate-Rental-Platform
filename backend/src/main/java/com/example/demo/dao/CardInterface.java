package com.example.demo.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

import com.example.demo.model.Card;

@Component
public interface CardInterface {

    List<Card> selectAllCards();

    Optional<Card> selectCardByCardId(String cardId);

    int updateCard(Card card);

    int deleteCardByCardId(String carId);

    int insertCardImp(Card card);

    List<Card> searchCards(String filters);

    List<String> getDistinctCountries();

    List<String> getDistinctCities();

    List<String> getDistinctStreets();

    List<Card> getListingsByUserId(String userId);

}

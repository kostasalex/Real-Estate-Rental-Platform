package com.example.demo.dao;

import java.util.List;
import java.util.Optional;


import com.example.demo.model.Card;

public interface CardDao {
    
    List<Card> selectAllCards();
    Optional<Card> selectCardByCardId(String cardId);
    int updateCard(Card card);
    int deleteCardByCardId(String carId);
    int insertCard(String carId,Card card); 
    
}

package com.example.demo.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.demo.model.Card;

public interface CardDao {
    
    List<Card> selectAllCards();
    Optional<Card> selectCardByCardUid(UUID cardUid);
    int updateCard(Card card);
    int deleteCardByCardUid(UUID carUid);
    int insertCard(UUID carUid,Card card); 
    
}

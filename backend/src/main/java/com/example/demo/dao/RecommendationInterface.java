package com.example.demo.dao;

import com.example.demo.model.Card;
import java.util.List;

public interface RecommendationInterface {
    List<Card> getListingsByGuest(List<Integer> ids);

    List<Card> getListingsByUser(int userId);
}

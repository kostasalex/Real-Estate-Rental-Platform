package com.example.demo.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Card;

@Repository
public class FakeDataDaoCard implements CardDao {

    private static Map<UUID,Card> database;

    static {
        database = new HashMap<>();
        UUID joeCardUid = UUID.randomUUID();
        database.put(joeCardUid,
            new Card(joeCardUid,
                "https://a1.muscache.com/ac/pictures/13462809/26642ff7_original.jpg?interpolation=lanczos-none&size=small&output-format=jpg&output-quality=70",
                "Entire home/apt",
                "Frinichou, Athens, Attica 105 58, Greece",
                "This 30m2 flat on Frinihou str. is located in Plaka, the old part of the city, at the foot of the Acropolis in the heart of Athens. Frinihou str. is a quiet street very close to a main street which leads to the New Acropolis Museum. The flat is only 100m away from the “Acropolis” Metro station as well as the New Acropolis Museum. Very close -less than 50m away- the Dionisiou Aeropagitou pedestrian street starts which is considered one of the most beautiful pedestrian streets in Athens. It takes straight to the Herodou Attikou ancient theatre. The flat is in the semi-basement of a stately building with its own court aglaise. It overlooks the street and its really sunny and bright. The flat is fully furnished, beautifully decorated and equipped with a kitchen , air-conditioning , central heating, a telephone line and free Internet. It is a two person flat but there is plenty of room for a third person. Super offer Two bicycles at your disposal, to ride the historical part of Athens free ",
                "Athens Soul Apartments Plaka",
                "Dimitris",
                "https://a0.muscache.com/ac/users/4935030/profile_pic/1359790474/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=225:*&output-format=jpg&output-quality=70",
                "{Internet,Wireless Internet,Air Conditioning,Kitchen,Heating}",
                "Real Bed",
                "2013-02-02",
                "Athens, Attica, Greece",
                "Hello! My name is Dimitris. You are welcome to come and stay at my apartments in Athens, Greece! If you have any questions, feel free to ask!",
                "within a few hours",
                100,
                2,
                40,
                2,
                1,
                2,
                2,
                3,
                63,
                23.731204f,
                37.969859f));

    }

    @Override
    public List<Card> selectAllCards() {
        return new ArrayList<>(database.values());
    }

    @Override
    public Optional<Card> selectCardByCardUid(UUID cardUid) {
        return Optional.ofNullable(database.get(cardUid));
    }

    @Override
    public int updateCard(Card card) {
        database.put(card.getCardUid(), card);
        return 1;
    }

    @Override
    public int deleteCardByCardUid(UUID cardUid) {
        database.remove(cardUid);
        return 1;
    }

    @Override
    public int insertCard(UUID cardUid, Card card) {
        database.put(cardUid, card);
        return 1;
    }
    
}
